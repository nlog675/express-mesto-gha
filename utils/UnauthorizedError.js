class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.errorCode = 401;
  }
}

module.exports = UnauthorizedError;
