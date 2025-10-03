const express = require('express');
const drugController = require('../controllers/drugController');

const router = express.Router();

/**
 * @route GET /api/config
 * @desc Get table configuration
 * @access Public
 */
router.get('/config', drugController.getTableConfig);

/**
 * @route GET /api/drugs
 * @desc Get all drugs with optional company filter
 * @access Public
 */
router.get('/drugs', drugController.getDrugs);

/**
 * @route GET /api/companies
 * @desc Get distinct company names
 * @access Public
 */
router.get('/companies', drugController.getCompanies);

module.exports = router;