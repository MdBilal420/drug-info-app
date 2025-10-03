const drugService = require('../services/drugService');

class DrugController {
  /**
   * Get table configuration
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getTableConfig(req, res) {
    try {
      const config = drugService.getTableConfig();
      res.json(config);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get all drugs with optional company filter
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getDrugs(req, res) {
    try {
      const { company } = req.query;
      const drugs = await drugService.getAllDrugs(company);
      res.json(drugs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get distinct company names
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getCompanies(req, res) {
    try {
      const companies = await drugService.getCompanies();
      res.json(companies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new DrugController();