const router = require('express').Router();
const cardRouter = require('./cards');
const userRouter = require('./users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../utils/NotFoundError');
const { login, createUser } = require('../controllers/users');
const { loginValidation, registerValidation } = require('../middlewares/validation');

router.post('/signin', loginValidation, login);
router.post('/signup', registerValidation, createUser);
router.use(auth);
router.use('/', userRouter);
router.use('/', cardRouter);
router.use('*', () => {
  throw new NotFoundError('Такой страницы не существует');
});

module.exports = router;
