const router = require('express').Router();

const userRouter = require('./users');
const cardRouter = require('./cards');

const authMiddleware = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError'); // 404 ошибка

const { login, createUser } = require('../controllers/users');
const { signinValidation, signupValidation } = require('../middlewares/validations');

router.post('/signin', signinValidation, login);
router.post('/signup', signupValidation, createUser);

// все роуты (кроме /signin и /signup) защищены авторизацией
router.use(authMiddleware);

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
