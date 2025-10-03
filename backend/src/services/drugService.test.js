const drugService = require('./drugService');

describe('DrugService', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('getAllDrugs', () => {
    test('should return all drugs when no company filter is provided', async () => {
      // Arrange
      const mockDrugs = [
        { id: 1, code: 'D001', genericName: 'Aspirin', brandName: 'Bayer', company: 'Company A', launchDate: new Date('2020-01-01') },
        { id: 2, code: 'D002', genericName: 'Ibuprofen', brandName: 'Advil', company: 'Company B', launchDate: new Date('2021-01-01') }
      ];
      
      const findManySpy = jest.spyOn(drugService, 'getAllDrugs').mockResolvedValue(mockDrugs);

      // Act
      const result = await drugService.getAllDrugs();

      // Assert
      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty('id');
      
      findManySpy.mockRestore();
    });

    test('should return drugs filtered by company when company filter is provided', async () => {
      // Arrange
      const mockDrugs = [
        { id: 1, code: 'D001', genericName: 'Aspirin', brandName: 'Bayer', company: 'Company A', launchDate: new Date('2020-01-01') }
      ];
      
      const findManySpy = jest.spyOn(drugService, 'getAllDrugs').mockResolvedValue(mockDrugs);

      // Act
      const result = await drugService.getAllDrugs('Company A');

      // Assert
      expect(result).toHaveLength(1);
      expect(result[0].company).toBe('Company A');
      
      findManySpy.mockRestore();
    });
  });

  describe('getCompanies', () => {
    test('should return distinct company names sorted alphabetically', async () => {
      // Arrange
      const mockCompanies = [
        { company: 'Company C' },
        { company: 'Company A' },
        { company: 'Company B' }
      ];
      
      const getCompaniesSpy = jest.spyOn(drugService, 'getCompanies').mockResolvedValue(['Company A', 'Company B', 'Company C']);

      // Act
      const result = await drugService.getCompanies();

      // Assert
      expect(result).toEqual(['Company A', 'Company B', 'Company C']);
      
      getCompaniesSpy.mockRestore();
    });
  });

  describe('getTableConfig', () => {
    test('should return the correct table configuration', () => {
      // Act
      const result = drugService.getTableConfig();

      // Assert
      expect(result).toEqual({
        columns: [
          { id: 'id', label: 'Id', sortable: true },
          { id: 'code', label: 'Code', sortable: true },
          { id: 'name', label: 'Name', sortable: true },
          { id: 'company', label: 'Company', sortable: true },
          { id: 'launchDate', label: 'Launch Date', sortable: true }
        ]
      });
    });
  });
});