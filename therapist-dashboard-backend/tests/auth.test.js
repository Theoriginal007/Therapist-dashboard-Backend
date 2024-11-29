const request = require('supertest');
const app = require('../app'); // Import your app
const { connect, disconnect } = require('../utils/db'); // Database setup for tests

// Sample user data
const validUser = {
    email: 'test@example.com',
    password: 'test1234'
};

beforeAll(async () => {
    await connect();
    // Seed database with a user for login test (optional)
    await request(app).post('/api/v1/auth/register').send(validUser);
});

afterAll(async () => {
    await disconnect();
});

describe('Auth Routes', () => {
    test('POST /api/v1/auth/login - should login a user with valid credentials', async () => {
        const res = await request(app)
            .post('/api/v1/auth/login')
            .send(validUser);
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        expect(res.body).toHaveProperty('user');
    });

    test('POST /api/v1/auth/login - should fail with invalid password', async () => {
        const res = await request(app)
            .post('/api/v1/auth/login')
            .send({ email: validUser.email, password: 'wrongpassword' });
        
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('status', 'fail');
        expect(res.body).toHaveProperty('message', 'Invalid credentials');
    });

    test('POST /api/v1/auth/login - should fail with missing password', async () => {
        const res = await request(app)
            .post('/api/v1/auth/login')
            .send({ email: validUser.email });
        
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('status', 'fail');
        expect(res.body).toHaveProperty('message', 'Password is required');
    });

    test('POST /api/v1/auth/login - should fail with missing email', async () => {
        const res = await request(app)
            .post('/api/v1/auth/login')
            .send({ password: validUser.password });
        
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('status', 'fail');
        expect(res.body).toHaveProperty('message', 'Email is required');
    });
});
