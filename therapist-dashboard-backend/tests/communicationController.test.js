// tests/communicationController.test.js

const request = require('supertest');
const app = require('../server'); // Adjust path as necessary
const Communication = require('../models/Communication'); // Adjust path as necessary
const jwt = require('jsonwebtoken');

jest.mock('../models/Communication'); // Mock the Communication model

describe('Communication Controller Tests', () => {
    let token;

    beforeAll(() => {
        token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    test('should send a communication message', async () => {
        const messageData = {
            userId: 'userId1',
            message: 'This is a test message',
        };

        Communication.create.mockResolvedValue(messageData); // Mock the create method

        const response = await request(app)
            .post('/api/communication/send')
            .set('Authorization', `Bearer ${token}`)
            .send(messageData);

        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Message sent successfully!');
    });

    test('should handle error when sending a message', async () => {
        Communication.create.mockRejectedValue(new Error('Database error'));

        const response = await request(app)
            .post('/api/communication/send')
            .set('Authorization', `Bearer ${token}`)
            .send({});

        expect(response.status).toBe(500);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('An error occurred while sending the message.');
    });
});
