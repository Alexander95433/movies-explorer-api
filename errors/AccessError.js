const { accessErrorCode } = require('../utils/constants');

class AccessError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = accessErrorCode;
  }
}
module.exports = AccessError;
