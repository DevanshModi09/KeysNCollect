const express = require('express');
const adminauthenticator = require('../../middleware/adminauthentication');
const userauthenticator = require('../../middleware/userauthentication');
const router = express.Router();
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require('../controllers/userController');
router.use(userauthenticator, adminauthenticator);
router.route('/').get(getAllUsers);

router.route('/:id').get(getSingleUser);

module.exports = router;
