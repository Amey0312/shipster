const Joi = require('joi');

// Middleware for validating incoming requests
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400);
      throw new Error(error.details[0].message);
    }
    next();
  };
};

// Example schemas
const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('admin', 'partner'),
});

const orderSchema = Joi.object({
  orderNumber: Joi.string().required(),
  customer: Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
  }).required(),
  area: Joi.string().required(),
  items: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        quantity: Joi.number().positive().required(),
        price: Joi.number().positive().required(),
      })
    )
    .required(),
  status: Joi.string().valid('pending', 'assigned', 'picked', 'delivered'),
  totalAmount: Joi.number().required(),
});

module.exports = { validate, userSchema, orderSchema };
