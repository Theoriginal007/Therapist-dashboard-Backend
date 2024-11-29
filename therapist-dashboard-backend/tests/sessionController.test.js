// tests/sessionController.test.js

const request = require('supertest');
const app = require('../server'); // Adjust path as necessary
const Session = require('../models/Session'); // Adjust path as necessary
const jwt = require('jsonwebtoken');

jest.mock('../models/Session'); // Mock the Session model

describe('Session Controller Tests', () => {
    let token;

    beforeAll(() => {
        token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    test('should schedule a session', async () => {
        const sessionData = {
            patientId: 'patientId1',
            date: '2024-10-10T10:00:00Z',
            duration: 60,
        };

        Session.create.mockResolvedValue(sessionData);

        const response = await request(app)
            .post('/api/sessions/schedule')
            .set('Authorization', `Bearer ${token}`)
            .send(sessionData);

        expect(response
