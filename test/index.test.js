import request from 'supertest';
import app from '../index.js'

describe('Root route "/"', () => {
    test('GET to root should respond with a 200 status', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });
    test('Root should respond with text of "howdy!"', async () => {
        const response = await request(app).get('/');
        expect(response.text).toBe('howdy!');
    });
});

describe('Cat Index "/cats"', () => {
    test('Accessing cat index should respond with a 200 status', async () => {
        const response = await request(app).get('/cats');
        expect(response.statusCode).toBe(200);
    });
    test('Accessing cat index should return an object with four cats', async () => {
        const response = await request(app).get('/cats');
        expect(Object.keys(response.body)).toHaveLength(4);
    });
});

describe('Cat Show "/cats/catId"', () => {
    test('Attempting to access an invalid catId should yield a 400 status', async () => {
        const response = await request(app).get('/cats/5');
        expect(response.statusCode).toBe(400);
    });
    test('Attempting to access an invalid catId should yield an error message saying "No such Kitty!"', 
    async () => {
        const response = await request(app).get('/cats/5');
        expect(response.error.text).toBe('{"errorMessage":"No such Kitty!"}');
    });
    test('Accessing a cat with a valid ID should return a 200 status', async () => {
        const response = await request(app).get('/cats/1');
        expect(response.statusCode).toBe(200);
    });
    test('Accessing a cat with the ID of 1 should return Sennacy', async () => {
        const response = await request(app).get('/cats/1');
        expect(response.body.name).toBe("Sennacy");
    });
});

// post tests
describe('Cat Creation "/cats"', () => {
    test('Creating a cat with all the required fields should yield a 200 status', async () => {
        const response = await request(app)
            .post('/cats')
            .send({
                name: 'Sennacy',
                furColor: 'orange',
                favoriteFood: 'turkey giblets',
            })
        expect(response.statusCode).toBe(200);
    });

    test('Creating a cat with missing required fields should yield a 400 status', async () => {
        const response = await request(app)
            .post('/cats')
            .send({
                name: 'Sennacy',
                furColor: '',
                favoriteFood: 'turkey giblets',
            })
        expect(response.statusCode).toBe(400);
    });

    test('Creating a cat with color string longer than 10 should yield a 400 status', async () => {
        const response = await request(app)
            .post('/cats')
            .send({
                name: 'Sennacy',
                furColor: 'Supercalifragilisticexpialadotious',
                favoriteFood: 'turkey giblets',
            })
        expect(response.statusCode).toBe(400);
    });

    test('Creating a cat who eats unexpected food should yield a 400 status', async () => {
        const response = await request(app)
            .post('/cats')
            .send({
                name: 'Sennacy',
                furColor: 'pink',
                favoriteFood: 'chicken & waffles',
            })
        expect(response.statusCode).toBe(400);
    });
});

describe('Cat Deletion "/cats/catId"', () => {
    test('Attempting to delete an invalid catId should yield a 400 status', async () => {
        const response = await request(app).delete('/cats/5');
        expect(response.statusCode).toBe(400);
    });
    test('Attempting to delete an invalid catId should yield an error message saying "No such Kitty!"', 
    async () => {
        const response = await request(app).delete('/cats/5');
        expect(response.error.text).toBe('{"errorMessage":"No such Kitty!"}');
    });
    test('Deleting a cat with a valid ID should return a 200 status', async () => {
        const response = await request(app).delete('/cats/1');
        expect(response.statusCode).toBe(200);
    });
});