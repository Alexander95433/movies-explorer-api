const jwt = require('jsonwebtoken');
const BadAuthError = require('../errors/BadAuthError');

const { secretKey } = require('../utils/constants');

const auth = (req, res, next) => {
  // if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
  //   return new BadAuthError('Необходима авторизация');
  // }
  // const token = req.headers.authorization.replace('Bearer ', '');

  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    return next(new BadAuthError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};
module.exports = auth;
