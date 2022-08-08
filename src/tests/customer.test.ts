import request from 'supertest';
import app from '../app';
import { customerMock } from './mocks';

describe('Customer', () => {
    describe('Creating new customer', () => {
        it('should create and return a new customer', async () => {
            const customer_mock = customerMock();
            const res = await request(app).post('/customer/create').send(customer_mock);
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('customer_id');
        });

        it('should validate email at creation', async () => {
            const customer_mock = customerMock();
            customer_mock.email = 'wrong_data';
            const res = await request(app).post('/customer/create').send(customer_mock);
            expect(res.statusCode).toEqual(400);
            expect(res.body[0]).toContain('email');
        });

        it('should validate birth_date at creation', async () => {
            const customer_mock = customerMock();
            customer_mock.birth_date = 'false';
            const res = await request(app).post('/customer/create').send(customer_mock);
            expect(res.statusCode).toEqual(400);
            expect(res.body[0]).toContain('birth_date');
        });
    });

    describe('Creating new customer', () => {
        it('should update and return a new customer', async () => {
            const customer_mock = customerMock();
            const aux_res = await request(app).post('/customer/create').send(customer_mock);
            const { customer_id } = aux_res.body;
            customer_mock.name = 'updated name';
            const res = await request(app).put(`/customer/update/${customer_id}`).send(customer_mock);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('customer_id');
            expect(res.body.name).toBe('updated name');
        });

        it('should validate email at update', async () => {
            const customer_mock = customerMock();
            const aux_res = await request(app).post('/customer/create').send(customer_mock);
            const { customer_id } = aux_res.body;
            customer_mock.email = 'wrong_data';
            const res = await request(app).put(`/customer/update/${customer_id}`).send(customer_mock);
            expect(res.statusCode).toEqual(400);
            expect(res.body[0]).toContain('email');
        });

        it('should validate birth_date at update', async () => {
            const customer_mock = customerMock();
            const aux_res = await request(app).post('/customer/create').send(customer_mock);
            const { customer_id } = aux_res.body;
            customer_mock.birth_date = 'false';
            const res = await request(app).put(`/customer/update/${customer_id}`).send(customer_mock);
            expect(res.statusCode).toEqual(400);
            expect(res.body[0]).toContain('birth_date');
        });
    });

    it('should delete a customer', async () => {
        const customer_mock = customerMock();
        const aux_res = await request(app).post('/customer/create').send(customer_mock);
        const { customer_id } = aux_res.body;
        const res = await request(app).delete(`/customer/delete/${customer_id}`);
        expect(res.statusCode).toEqual(204);
    });

    it('should return all customers or none', async () => {
        const res = await request(app).get('/customer/findAll');
        expect([200, 204]).toContain(res.statusCode);
    });

    it('should return one customer or none', async () => {
        const res = await request(app).get('/customer/findOne/1');
        expect([200, 400]).toContain(res.statusCode);
    });
});
