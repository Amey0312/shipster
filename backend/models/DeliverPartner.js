const mongoose = require('mongoose');

const deliveryPartnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  currentLoad: { type: Number, default: 0, max: 3 },
  areas: [{ type: String }],
  shift: {
    start: { type: String, required: true }, // Format: HH:mm
    end: { type: String, required: true },  // Format: HH:mm
  },
  metrics: {
    rating: { type: Number, default: 0 },
    completedOrders: { type: Number, default: 0 },
    cancelledOrders: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model('DeliveryPartner', deliveryPartnerSchema);
