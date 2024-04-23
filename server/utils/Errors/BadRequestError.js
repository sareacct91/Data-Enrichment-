module.exports = class BadRequestError extends Error {
  /** @param {String} msg  */
  constructor(msg) {
    super(msg);
    /** @type {Number} */
    this.code = 400;
  }
};
