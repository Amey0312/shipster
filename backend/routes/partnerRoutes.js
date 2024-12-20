const express = require('express');
const router = express.Router();
const partnerController = require('../controllers/partnerController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.get('/', protect, admin, partnerController.getPartners);
router.post('/', protect, admin, partnerController.createPartner);
router.put('/:id', protect, admin, partnerController.updatePartner);
router.post('/logout', protect, partnerController.logoutPartner);
router.delete('/:id', protect, admin, partnerController.deletePartner);

module.exports = router;
