const { accessDeniedErrorCode } = require('../utils/constants');

class CardDeletionError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = accessDeniedErrorCode;
  }
}
module.exports = CardDeletionError;
