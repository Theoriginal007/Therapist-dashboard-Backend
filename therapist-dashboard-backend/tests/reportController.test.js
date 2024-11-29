// tests/reportController.test.js

const request = require('supertest');
const app = require('../server'); // Adjust path as necessary
const Report = require('../models/Report'); // Adjust path as necessary
const jwt = require('jsonwebtoken');

jest.mock('../models/Report'); // Mock the Report model

describe('Report Controller Tests', () => {
    let token;

    beforeAll(() => {
        token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    test('should generate a report', async () => {
        const reportData = {
            patientId: 'patientId1',
            reportDetails: 'Report content here',
        };

        Report.create.mockResolvedValue(reportData);

        const response = await request(app)
            .post('/api/reports/generate')
            .set('Authorization', `Bearer ${token}`)
            .send(reportData);

        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.report).toHaveProperty('_id');
    });

    test('should handle report generation errors', async () => {
        Report.create.mockRejectedValue(new Error('Error generating report'));

        const response = await request(app)
            .post('/api/reports/generate')
            .set('Authorization', `Bearer ${token}`)
            .send({});

        expect(response.status).toBe(500);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('An error occurred while generating the report.');
    });
});
