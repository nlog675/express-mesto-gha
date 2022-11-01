const router = require('express').Router();
const {
  getUsers, getUserById, updateProfile, updateAvatar, getUser,
} = require('../controllers/users');
const {
  updateProfileValidation, udateAvatarValidation, userIdValidation,
} = require('../middlewares/validation');

router.get('/users', getUsers);
router.get('/users/me', getUser);
router.get('/users/:userId', userIdValidation, getUserById);
router.patch('/users/me', updateProfileValidation, updateProfile);
router.patch('/users/me/avatar', udateAvatarValidation, updateAvatar);

module.exports = router;
