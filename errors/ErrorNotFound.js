const { notFoundErrorCode } = require('../utils/constants');

class ErrorNotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = notFoundErrorCode;
  }
}

module.exports = ErrorNotFound;
