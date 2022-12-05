const { authdErrorCode } = require('../utils/constants');

class BadAuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = authdErrorCode;
  }
}

module.exports = BadAuthError;
