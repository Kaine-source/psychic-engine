const test = require("node:test");
const assert = require("node:assert/strict");

const { ConfigStore } = require("../src/configStore");

test("ConfigStore initializes with xpRate=1", () => {
  const store = new ConfigStore();
  assert.equal(store.get().xpRate, 1);
});

test("ConfigStore updates xpRate when valid", () => {
  const store = new ConfigStore();
  const updated = store.setXpRate(2.5);
  assert.equal(updated.xpRate, 2.5);
});

test("ConfigStore rejects invalid xpRate", () => {
  const store = new ConfigStore();
  assert.throws(() => store.setXpRate("not-a-number"));
  assert.throws(() => store.setXpRate(0));
});
