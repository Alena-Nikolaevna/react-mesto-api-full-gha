const userRouter = require('express').Router();
const { updateUserAvatarValidation, updateUserProfileValidation, userIdValidation } = require('../middlewares/validations');

const {
  getCurrentUserInform, getUsers, getUser, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');

userRouter.get('/me', getCurrentUserInform);
// userRouter.post('/', createUser); // POST /users — создаёт пользователя
userRouter.get('/', getUsers); // GET /users — возвращает всех пользователей
userRouter.get('/:userId', userIdValidation, getUser); // GET /users/:userId - возвращает пользователя по _id
userRouter.patch('/me', updateUserProfileValidation, updateUserProfile); // PATCH /users/me — обновляет профиль
userRouter.patch('/me/avatar', updateUserAvatarValidation, updateUserAvatar); // PATCH /users/me/avatar — обновляет аватар

module.exports = userRouter;
