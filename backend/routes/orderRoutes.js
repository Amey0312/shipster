const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect } = require('../middlewares/authMiddleware');
const { validate, orderSchema } = require('../middlewares/validationMiddleware');

router.post('/', protect, validate(orderSchema), orderController.createOrder);
router.put('/:id/status', protect, orderController.updateOrderStatus);

module.exports = router;
