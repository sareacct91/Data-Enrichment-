module.exports = class NotFoundError extends Error {
  /** @param {String} msg  */
  constructor(msg) {
    super(msg);
    /** @type {Number} */
    this.code = 404;
  }
};

