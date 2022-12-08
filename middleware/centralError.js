const { serverErrorCode } = require('../utils/constants');

module.exports = ((err, req, res, next) => {
  const { statusCode = serverErrorCode, message } = err;
  res.status(statusCode).send({ message: statusCode === serverErrorCode ? 'На сервере произошла ошибка' : message });
  return next();
});
