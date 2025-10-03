const drugController = require('./drugController');
const drugService = require('../services/drugService');

describe('DrugController', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('getDrugs', () => {
    test('should return all drugs when no company filter is provided', async () => {
      // Arrange
      const mockDrugs = [
        { id: 1, code: 'D001', genericName: 'Aspirin', brandName: 'Bayer', company: 'Company A', launchDate: '2020-01-01' },
        { id: 2, code: 'D002', genericName: 'Ibuprofen', brandName: 'Advil', company: 'Company B', launchDate: '2021-01-01' }
      ];
      
      const req = { query: {} };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };
      
      jest.spyOn(drugService, 'getAllDrugs').mockResolvedValue(mockDrugs);

      // Act
      await drugController.getDrugs(req, res);

      // Assert
      expect(drugService.getAllDrugs).toHaveBeenCalledWith(undefined);
      expect(res.json).toHaveBeenCalledWith(mockDrugs);
    });

    test('should return drugs filtered by company when company filter is provided', async () => {
      // Arrange
      const mockDrugs = [
        { id: 1, code: 'D001', genericName: 'Aspirin', brandName: 'Bayer', company: 'Company A', launchDate: '2020-01-01' }
      ];
      
      const req = { query: { company: 'Company A' } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };
      
      jest.spyOn(drugService, 'getAllDrugs').mockResolvedValue(mockDrugs);

      // Act
      await drugController.getDrugs(req, res);

      // Assert
      expect(drugService.getAllDrugs).toHaveBeenCalledWith('Company A');
      expect(res.json).toHaveBeenCalledWith(mockDrugs);
    });

    test('should return 500 error when service throws an error', async () => {
      // Arrange
      const req = { query: {} };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };
      
      jest.spyOn(drugService, 'getAllDrugs').mockRejectedValue(new Error('Database error'));

      // Act
      await drugController.getDrugs(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
    });
  });
});