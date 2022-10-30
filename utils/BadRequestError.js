class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.errorCode = 400;
  }
}

module.exports = BadRequestError;
