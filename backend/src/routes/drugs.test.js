const request = require('supertest');
const express = require('express');
const drugRoutes = require('./drugs');

// Create an express app for testing
const app = express();
app.use(express.json());
app.use('/api', drugRoutes);

describe('Drug Routes', () => {
  describe('GET /api/drugs', () => {
    test('should respond to GET request', async () => {
      // Act
      const response = await request(app).get('/api/drugs');

      // Assert
      expect(response.status).toBe(200);
    });

    test('should respond to GET request with company filter', async () => {
      // Act
      const response = await request(app).get('/api/drugs?company=Company A');

      // Assert
      expect(response.status).toBe(200);
    });
  });
});