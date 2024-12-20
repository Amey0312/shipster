const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect, admin  } = require('../middlewares/authMiddleware');
const { validate, userSchema } = require('../middlewares/validationMiddleware');

router.post('/register', validate(userSchema), authController.register);
router.post('/login', authController.login);
router.post('/logout', protect, authController.logoutUser);
// Delete a user (admin-only)
router.delete('/:id', protect, admin, authController.removeUser);


module.exports = router;
