const asyncHandler = require('express-async-handler');
const partnerService = require('../services/partnerService');
const { successResponse } = require('../utils/responseHelper');
// Get all partners
const getPartners = asyncHandler(async (req, res) => {
  const partners = await partnerService.getAllPartners();
  res.status(200).json(partners);
});

// Create a new partner
const createPartner = asyncHandler(async (req, res) => {
  const partner = await partnerService.addPartner(req.body);
  res.status(201).json(partner);
});

// Update a partner
const updatePartner = asyncHandler(async (req, res) => {
  const updated = await partnerService.updatePartner(req.params.id, req.body);
  res.status(200).json(updated);
});

// Logout delivery partner
const logoutPartner = asyncHandler(async (req, res) => {
  // For stateless JWT, clear the token on the client-side
  successResponse(res, 'Partner logged out successfully');
});

// Delete a partner
const deletePartner = asyncHandler(async (req, res) => {
  await partnerService.deletePartner(req.params.id);
  res.status(204).send();
});

module.exports = { getPartners, createPartner, updatePartner, deletePartner , logoutPartner};
