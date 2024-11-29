// tests/settingsController.test.js

const request = require('supertest');
const app = require('../server'); // Adjust path as necessary
const Settings = require('../models/Settings'); // Adjust path as necessary
const jwt = require('jsonwebtoken');

jest.mock('../models/Settings'); // Mock the Settings model

describe('Settings Controller Tests', () => {
    let token;

    beforeAll(() => {
        token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    test('should update settings', async () => {
        const settingsData = {
            theme: 'dark',
            notifications: true,
        };

        Settings.findByIdAndUpdate.mockResolvedValue(settingsData);

        const response = await request(app)
            .put('/api/settings')
            .set('Authorization', `Bearer ${token}`)
            .send(settingsData);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.settings).toEqual(settingsData);
    });

    test('should handle settings update errors', async () => {
        Settings.findByIdAndUpdate.mockRejectedValue(new Error('Error updating settings'));

        const response = await request(app)
            .put('/api/settings')
            .set('Authorization', `Bearer ${token}`)
            .send({});

        expect(response.status).toBe(500);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('An error occurred while updating settings.');
    });
});
