import request from 'supertest';
import app from '../app';
import { saleMock } from './mocks';

describe('Sale', () => {
    describe('Creating new sale', () => {
        it('should create and return a new sale', async () => {
            const sale_mock = await saleMock();
            const res = await request(app).post('/sale/create').send(sale_mock);
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('sale_id');
        });

        it('should validate customer_id at creation', async () => {
            const sale_mock = await saleMock();
            sale_mock.customer_id = 999999;
            const res = await request(app).post('/sale/create').send(sale_mock);
            expect(res.statusCode).toEqual(400);
            expect(res.body[0]).toContain('found');
        });

        it('should validate product_id at creation', async () => {
            const sale_mock = await saleMock();
            sale_mock.product_id = 999999;
            const res = await request(app).post('/sale/create').send(sale_mock);
            expect(res.statusCode).toEqual(400);
            expect(res.body[0]).toContain('found');
        });
    });

    describe('Updating a sale', () => {
        it('should update and return a new sale', async () => {
            const sale_mock = await saleMock();
            const aux_res = await request(app).post('/sale/create').send(sale_mock);
            const { sale_id } = aux_res.body;
            const res = await request(app).put(`/sale/update/${sale_id}`).send(sale_mock);
            expect(res.statusCode).toEqual(405);
            expect(res.body[0]).toContain('allowed');
        });
    });

    it('should delete a sale', async () => {
        const sale_mock = await saleMock();
        const aux_res = await request(app).post('/sale/create').send(sale_mock);
        const { sale_id } = aux_res.body;
        const res = await request(app).delete(`/sale/delete/${sale_id}`);
        expect(res.statusCode).toEqual(204);
    });

    it('should return all sales or none', async () => {
        const res = await request(app).get('/sale/findAll');
        expect([200, 204]).toContain(res.statusCode);
    });

    it('should return one sale or none', async () => {
        const res = await request(app).get('/sale/findOne/1');
        expect([200, 400]).toContain(res.statusCode);
    });
});
