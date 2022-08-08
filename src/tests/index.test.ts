import request from 'supertest';
import app from '../app';

describe('Home', () => {
    it('should return API Status', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('API Status');
    });
});
