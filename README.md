# psychic-engine

Scaffolding for a **self-hosted Luna-based game stack** focused on learning how to collaborate with Codex while building practical game admin tools.

## Goal

Build and host our own version of the game server inspired by [luna-rs/luna](https://github.com/luna-rs/luna), with an admin control plane for:

- XP rate management
- Item spawn commands
- Future live operations tools (events, balances, player moderation)

## What is scaffolded right now

```text
.
├── apps/
│   └── admin-api/
│       ├── package.json
│       ├── src/
│       │   ├── configStore.js
│       │   ├── index.js
│       │   └── lunaAdapter.js
│       └── test/
│           └── configStore.test.js
├── docs/
│   └── ROADMAP.md
├── infra/
│   └── docker-compose.yml
└── .gitignore
```

## Quick start

### 1) Run the admin API locally

```bash
cd apps/admin-api
npm test
ADMIN_TOKEN=dev-admin-token npm start
```

The API runs on `http://localhost:8080` by default.

### 2) Test endpoints

```bash
# Health
curl http://localhost:8080/health

# Read config
curl -H 'x-admin-token: dev-admin-token' \
  http://localhost:8080/admin/config

# Update XP rate
curl -X PUT -H 'x-admin-token: dev-admin-token' \
  -H 'content-type: application/json' \
  -d '{"xpRate": 2.5}' \
  http://localhost:8080/admin/config/xp-rate

# Spawn item
curl -X POST -H 'x-admin-token: dev-admin-token' \
  -H 'content-type: application/json' \
  -d '{"characterId":"char-1001","itemId":"item-heal-potion","quantity":5}' \
  http://localhost:8080/admin/spawn-item
```

## Notes

- `lunaAdapter.js` is currently a stub abstraction to be replaced with real Luna integration.
- See `docs/ROADMAP.md` for the phased plan to integrate real game server internals and persistent storage.
