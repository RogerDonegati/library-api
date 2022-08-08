import request from 'supertest';
import app from '../app';
import { rentalMock } from './mocks';

describe('Rental', () => {
    describe('Creating new rental', () => {
        it('should create and return a new rental', async () => {
            const rental_mock = await rentalMock();
            const res = await request(app).post('/rental/create').send(rental_mock);
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('rental_id');
        });

        it('should validate customer_id at creation', async () => {
            const rental_mock = await rentalMock();
            rental_mock.customer_id = 999999;
            const res = await request(app).post('/rental/create').send(rental_mock);
            expect(res.statusCode).toEqual(400);
            expect(res.body[0]).toContain('found');
        });

        it('should validate product_id at creation', async () => {
            const rental_mock = await rentalMock();
            rental_mock.product_id = 999999;
            const res = await request(app).post('/rental/create').send(rental_mock);
            expect(res.statusCode).toEqual(400);
            expect(res.body[0]).toContain('found');
        });

        it('should validate rent_days at creation', async () => {
            const rental_mock = await rentalMock();
            rental_mock.rent_days = -1;
            const res = await request(app).post('/rental/create').send(rental_mock);
            expect(res.statusCode).toEqual(400);
            expect(res.body[0]).toContain('rent_days');
        });
    });

    describe('Updating a rental', () => {
        it('should update and return a new rental', async () => {
            const rental_mock = await rentalMock();
            const aux_res = await request(app).post('/rental/create').send(rental_mock);
            const { rental_id } = aux_res.body;
            rental_mock.returned = true;
            const res = await request(app).put(`/rental/update/${rental_id}`).send(rental_mock);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('rental_id');
            expect(res.body.returned).toBe(true);
        });

        it('should force returned field at update', async () => {
            const rental_mock = await rentalMock();
            const aux_res = await request(app).post('/rental/create').send(rental_mock);
            const { rental_id } = aux_res.body;
            const res = await request(app).put(`/rental/update/${rental_id}`).send({});
            expect(res.statusCode).toEqual(400);
            expect(res.body[0]).toContain('returned');
        });
    });

    it('should delete a rental', async () => {
        const rental_mock = await rentalMock();
        const aux_res = await request(app).post('/rental/create').send(rental_mock);
        const { rental_id } = aux_res.body;
        const res = await request(app).delete(`/rental/delete/${rental_id}`);
        expect(res.statusCode).toEqual(204);
    });

    it('should return all rentals or none', async () => {
        const res = await request(app).get('/rental/findAll');
        expect([200, 204]).toContain(res.statusCode);
    });

    it('should return one rental or none', async () => {
        const res = await request(app).get('/rental/findOne/1');
        expect([200, 400]).toContain(res.statusCode);
    });
});
