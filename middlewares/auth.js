const token = require('jsonwebtoken');
const UnauthorizedError = require('../utils/UnauthorizedError');

// eslint-disable-next-line consistent-return
// module.exports.auth = (req, res, next) => {
//   const { authorization } = req.cookies;

//   if (!authorization || !authorization.startsWith('Bearer ')) {
//     next(new UnauthorizedError('Необходима авторизация1'));
//   }

//   const token = String(req.cookies.authorization).replace('Bearer ', '');
//   let payload;

//   try {
//     payload = jwt.verify(authorization, 'some-secret-key');
//   } catch (err) {
//     return next(new UnauthorizedError('Необходима авторизация2'));
//   }

//   req.user = payload;

//   next();
// };

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { jwt } = req.cookies;
  if (!jwt) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  let payload;

  try {
    payload = token.verify(jwt, 'some-secret-key');
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  req.user = payload;
  next();
};
