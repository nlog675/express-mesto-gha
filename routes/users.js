const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getUsers, getUserById, updateProfile, updateAvatar, getUser,
} = require('../controllers/users');
const {
  updateProfileValidation, udateAvatarValidation, userIdValidation,
} = require('../middlewares/validation');

router.get('/users', auth, getUsers);
router.get('/users/:userId', auth, userIdValidation, getUserById);
router.get('/users/me', auth, getUser);
router.patch('/users/me', auth, updateProfileValidation, updateProfile);
router.patch('/users/me/avatar', auth, udateAvatarValidation, updateAvatar);

module.exports = router;
