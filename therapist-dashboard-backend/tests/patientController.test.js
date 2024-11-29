// tests/patientController.test.js

const request = require('supertest');
const app = require('../server'); // Adjust path as necessary
const Patient = require('../models/Patient'); // Adjust path as necessary
const jwt = require('jsonwebtoken');

jest.mock('../models/Patient'); // Mock the Patient model

describe('Patient Controller Tests', () => {
    let token;

    beforeAll(() => {
        token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    test('should create a new patient', async () => {
        const newPatient = {
            userId: 'userId1',
            dateOfBirth: '2000-01-01',
            gender: 'female',
            medicalHistory: 'None',
        };

        Patient.create.mockResolvedValue(newPatient);

        const response = await request(app)
            .post('/api/patients')
            .set('Authorization', `Bearer ${token}`)
            .send(newPatient);

        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.patient).toHaveProperty('_id');
    });

    test('should return 404 for non-existent patient', async () => {
        Patient.findById.mockResolvedValue(null); // Mock to return null

        const response = await request(app)
            .get('/api/patients/invalidId')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Patient not found.');
    });
});
