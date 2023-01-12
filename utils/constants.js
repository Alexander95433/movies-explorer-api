const { NODE_ENV, JWT_SECRET } = process.env;

const addressMongodb = 'mongodb://localhost:27017/bitfilmsdb';
const secretKey = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

const authdErrorCode = 401;
const accessErrorCode = 409;
const badRequestErrorCode = 400;
const notFoundErrorCode = 404;
const accessDeniedErrorCode = 403;
const serverErrorCode = 500;

module.exports = {
  addressMongodb,
  secretKey,
  authdErrorCode,
  accessErrorCode,
  badRequestErrorCode,
  notFoundErrorCode,
  accessDeniedErrorCode,
  serverErrorCode,
};
