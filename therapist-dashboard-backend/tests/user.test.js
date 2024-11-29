const request = require('supertest');
const app = require('../app'); // Import your app
const { connect, disconnect } = require('../utils/db'); // Database setup for tests

const validUser = {
    email: 'testuser@example.com',
    password: 'testpassword',
    name: 'Test User'
};

let userId; // To store the user ID after registration

beforeAll(async () => {
    await connect();
});

afterAll(async () => {
    await disconnect();
});

// User Registration Tests
describe('User Routes', () => {
    test('POST /api/v1/users/register - should register a new user', async () => {
        const res = await request(app)
            .post('/api/v1/users/register')
            .send(validUser);
        
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('user');
        expect(res.body.user).toHaveProperty('_id');
        userId = res.body.user._id; // Store the user ID for later tests
    });

    test('POST /api/v1/users/register - should fail with missing email', async () => {
        const res = await request(app)
            .post('/api/v1/users/register')
            .send({ password: validUser.password, name: validUser.name });
        
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('status', 'fail');
        expect(res.body).toHaveProperty('message', 'Email is required');
    });

    test('POST /api/v1/users/register - should fail with missing password', async () => {
        const res = await request(app)
            .post('/api/v1/users/register')
            .send({ email: validUser.email, name: validUser.name });
        
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('status', 'fail');
        expect(res.body).toHaveProperty('message', 'Password is required');
    });

    // User Retrieval Test
    test('GET /api/v1/users/:id - should fetch user details', async () => {
        const res = await request(app)
            .get(`/api/v1/users/${userId}`)
            .set('Authorization', `Bearer your_jwt_token_here`); // Include a valid token
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('user');
        expect(res.body.user).toHaveProperty('_id', userId);
        expect(res.body.user).toHaveProperty('email', validUser.email);
        expect(res.body.user).toHaveProperty('name', validUser.name);
    });

    test('GET /api/v1/users/:id - should fail for non-existent user', async () => {
        const res = await request(app)
            .get('/api/v1/users/invalidUserId')
            .set('Authorization', `Bearer your_jwt_token_here`); // Include a valid token
        
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('status', 'fail');
        expect(res.body).toHaveProperty('message', 'User not found');
    });

    // User Update Test
    test('PUT /api/v1/users/:id - should update user details', async () => {
        const res = await request(app)
            .put(`/api/v1/users/${userId}`)
            .set('Authorization', `Bearer your_jwt_token_here`) // Include a valid token
            .send({ name: 'Updated User' });
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('user');
        expect(res.body.user).toHaveProperty('name', 'Updated User');
    });

    test('PUT /api/v1/users/:id - should fail with missing fields', async () => {
        const res = await request(app)
            .put(`/api/v1/users/${userId}`)
            .set('Authorization', `Bearer your_jwt_token_here`) // Include a valid token
            .send({}); // No fields provided
        
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('status', 'fail');
        expect(res.body).toHaveProperty('message', 'No fields to update');
    });
});
