import request from 'supertest';
import app from '../app';
import { productMock } from './mocks';

describe('Product', () => {
    describe('Creating new product', () => {
        it('should create and return a new product', async () => {
            const product_mock = productMock();
            const res = await request(app).post('/product/create').send(product_mock);
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('product_id');
        });

        it('should force any product (book, movie, tv_show) fields at creation', async () => {
            const product_mock = productMock();
            product_mock.movie = false;
            const res = await request(app).post('/product/create').send(product_mock);
            expect(res.statusCode).toEqual(400);
            expect(res.body[0]).toContain('book, movie, tv_show');
        });

        it('should force product (sell, rent) fields at creation', async () => {
            const product_mock = productMock();
            product_mock.sell = false;
            product_mock.rent = false;
            const res = await request(app).post('/product/create').send(product_mock);
            expect(res.statusCode).toEqual(400);
            expect(res.body[0]).toContain('sell');
            expect(res.body[0]).toContain('rent');
        });

        it('should force product (sell, sell_price) fields at creation', async () => {
            const product_mock = productMock();
            product_mock.sell = true;
            product_mock.sell_price = 0;
            const res = await request(app).post('/product/create').send(product_mock);
            expect(res.statusCode).toEqual(400);
            expect(res.body[0]).toContain('sell_price');
        });

        it('should force positive units at product creation', async () => {
            const product_mock = productMock();
            product_mock.units = -1;
            const res = await request(app).post('/product/create').send(product_mock);
            expect(res.statusCode).toEqual(400);
        });
    });

    describe('Updating existing product', () => {
        it('should update and return a new product', async () => {
            const product_mock = productMock();
            const aux_res = await request(app).post('/product/create').send(product_mock);
            const { product_id } = aux_res.body;
            product_mock.title = 'updated title';
            const res = await request(app).put(`/product/update/${product_id}`).send(product_mock);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('product_id');
            expect(res.body.title).toBe('updated title');
        });

        it('should force any product (book, movie, tv_show) fields at update', async () => {
            const product_mock = productMock();
            const aux_res = await request(app).post('/product/create').send(product_mock);
            const { product_id } = aux_res.body;
            product_mock.movie = false;
            const res = await request(app).put(`/product/update/${product_id}`).send(product_mock);
            expect(res.statusCode).toEqual(400);
            expect(res.body[0]).toContain('book, movie, tv_show');
        });

        it('should force product (sell, rent) fields at update', async () => {
            const product_mock = productMock();
            const aux_res = await request(app).post('/product/create').send(product_mock);
            const { product_id } = aux_res.body;
            product_mock.sell = false;
            product_mock.rent = false;
            const res = await request(app).put(`/product/update/${product_id}`).send(product_mock);
            expect(res.statusCode).toEqual(400);
            expect(res.body[0]).toContain('sell');
            expect(res.body[0]).toContain('rent');
        });

        it('should force product (sell, sell_price) fields at update', async () => {
            const product_mock = productMock();
            const aux_res = await request(app).post('/product/create').send(product_mock);
            const { product_id } = aux_res.body;
            product_mock.sell = true;
            product_mock.sell_price = 0;
            const res = await request(app).put(`/product/update/${product_id}`).send(product_mock);
            expect(res.statusCode).toEqual(400);
            expect(res.body[0]).toContain('sell_price');
        });

        it('should force positive units at product update', async () => {
            const product_mock = productMock();
            const aux_res = await request(app).post('/product/create').send(product_mock);
            const { product_id } = aux_res.body;
            product_mock.units = -1;
            const res = await request(app).put(`/product/update/${product_id}`).send(product_mock);
            expect(res.statusCode).toEqual(400);
        });
    });

    it('should delete a product', async () => {
        const product_mock = productMock();
        const aux_res = await request(app).post('/product/create').send(product_mock);
        const { product_id } = aux_res.body;
        const res = await request(app).delete(`/product/delete/${product_id}`);
        expect(res.statusCode).toEqual(204);
    });

    it('should return all products or none', async () => {
        const res = await request(app).get('/product/findAll');
        expect([200, 204]).toContain(res.statusCode);
    });

    it('should return one product or none', async () => {
        const res = await request(app).get('/product/findOne/1');
        expect([200, 400]).toContain(res.statusCode);
    });
});
