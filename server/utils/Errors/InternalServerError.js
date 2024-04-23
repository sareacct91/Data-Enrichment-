module.exports = class InternalServerError extends Error {
  /** @param {String} msg  */
  constructor(msg) {
    super(msg);
    /** @type {Number} */
    this.code = 500;
  }
};

