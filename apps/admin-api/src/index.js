const http = require("http");
const { ConfigStore } = require("./configStore");
const { LunaAdapter } = require("./lunaAdapter");

const PORT = Number(process.env.PORT || 8080);
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "dev-admin-token";

const configStore = new ConfigStore();
const lunaAdapter = new LunaAdapter();

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(body),
  });
  res.end(body);
}

function isAuthed(req) {
  return req.headers["x-admin-token"] === ADMIN_TOKEN;
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 1_000_000) {
        reject(new Error("Payload too large"));
      }
    });
    req.on("end", () => {
      if (!raw) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error("Body must be valid JSON"));
      }
    });
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/health") {
    sendJson(res, 200, { ok: true, service: "admin-api" });
    return;
  }

  if (!isAuthed(req)) {
    sendJson(res, 401, { error: "Unauthorized" });
    return;
  }

  if (req.method === "GET" && req.url === "/admin/config") {
    sendJson(res, 200, configStore.get());
    return;
  }

  if (req.method === "PUT" && req.url === "/admin/config/xp-rate") {
    try {
      const body = await parseBody(req);
      const updated = configStore.setXpRate(body.xpRate);
      const dispatch = await lunaAdapter.setXpRate(updated.xpRate);
      sendJson(res, 200, { config: updated, dispatch });
    } catch (error) {
      sendJson(res, 400, { error: error.message });
    }
    return;
  }

  if (req.method === "POST" && req.url === "/admin/spawn-item") {
    try {
      const body = await parseBody(req);
      const required = ["characterId", "itemId", "quantity"];
      const missing = required.filter((field) => !body[field]);
      if (missing.length > 0) {
        throw new Error(`Missing required fields: ${missing.join(", ")}`);
      }
      const dispatch = await lunaAdapter.spawnItem({
        characterId: String(body.characterId),
        itemId: String(body.itemId),
        quantity: Number(body.quantity),
      });
      sendJson(res, 202, { dispatch });
    } catch (error) {
      sendJson(res, 400, { error: error.message });
    }
    return;
  }

  sendJson(res, 404, { error: "Not Found" });
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`admin-api listening on :${PORT}`);
});
