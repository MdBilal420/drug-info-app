const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class DrugService {
  /**
   * Get all drugs with optional company filter
   * @param {string} companyFilter - Optional company name to filter by
   * @returns {Promise<Array>} - Array of drugs
   */
  async getAllDrugs(companyFilter = null) {
    try {
      const whereClause = companyFilter ? { company: companyFilter } : {};
      
      const drugs = await prisma.drug.findMany({
        where: whereClause,
        orderBy: {
          launchDate: 'desc'
        }
      });
      
      // Add an id field to each drug for display purposes
      return drugs.map((drug, index) => ({
        ...drug,
        id: index + 1
      }));
    } catch (error) {
      throw new Error(`Error fetching drugs: ${error.message}`);
    }
  }

  /**
   * Get distinct company names
   * @returns {Promise<Array>} - Array of company names
   */
  async getCompanies() {
    try {
      const companies = await prisma.drug.findMany({
        select: {
          company: true
        },
        distinct: ['company']
      });
      
      return companies.map(item => item.company).sort();
    } catch (error) {
      throw new Error(`Error fetching companies: ${error.message}`);
    }
  }

  /**
   * Get table configuration
   * @returns {Object} - Table configuration object
   */
  getTableConfig() {
    return {
      columns: [
        { id: 'id', label: 'Id', sortable: true },
        { id: 'code', label: 'Code', sortable: true },
        { id: 'name', label: 'Name', sortable: true },
        { id: 'company', label: 'Company', sortable: true },
        { id: 'launchDate', label: 'Launch Date', sortable: true }
      ]
    };
  }
}

module.exports = new DrugService();