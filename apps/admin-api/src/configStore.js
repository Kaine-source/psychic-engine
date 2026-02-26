const VALID_MIN_XP_RATE = 0.1;
const VALID_MAX_XP_RATE = 100;

class ConfigStore {
  constructor(initialConfig = { xpRate: 1 }) {
    this.config = { ...initialConfig };
  }

  get() {
    return { ...this.config };
  }

  setXpRate(nextRate) {
    const numericRate = Number(nextRate);
    if (!Number.isFinite(numericRate)) {
      throw new Error("xpRate must be a finite number");
    }

    if (numericRate < VALID_MIN_XP_RATE || numericRate > VALID_MAX_XP_RATE) {
      throw new Error(
        `xpRate must be between ${VALID_MIN_XP_RATE} and ${VALID_MAX_XP_RATE}`,
      );
    }

    this.config.xpRate = numericRate;
    return this.get();
  }
}

module.exports = {
  ConfigStore,
  VALID_MIN_XP_RATE,
  VALID_MAX_XP_RATE,
};
