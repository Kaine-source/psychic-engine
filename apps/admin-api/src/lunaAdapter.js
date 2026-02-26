/**
 * Placeholder integration layer for Luna server admin actions.
 *
 * When you wire this up for real, replace these no-op methods with
 * concrete calls (HTTP/gRPC/DB queue/RCON) into your game server stack.
 */
class LunaAdapter {
  async setXpRate(xpRate) {
    return {
      accepted: true,
      message: "XP rate update queued for Luna server",
      xpRate,
    };
  }

  async spawnItem({ characterId, itemId, quantity }) {
    return {
      accepted: true,
      message: "Item spawn request queued for Luna server",
      payload: { characterId, itemId, quantity },
    };
  }
}

module.exports = { LunaAdapter };
