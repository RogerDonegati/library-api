import request from 'supertest';
import app from '../app';

const customerMock = () => ({
    name: 'test name',
    email: 'test_email@gmail.com',
    document_id: 'test document_id',
    birth_date: '1990-11-23',
});

const productMock = () => ({
    title: 'test title',
    genre: 'test genre',
    synopsis: 'test synopsis',
    author: 'test author',
    units: 3,
    book: false,
    movie: true,
    tv_show: false,
    sell: true,
    rent: true,
    sell_price: 20,
    rent_price: 2,
});

const rentalMock = async () => {
    const product_mock = productMock();
    let aux_res = await request(app).post('/product/create').send(product_mock);
    const { product_id } = aux_res.body;

    const customer_mock = customerMock();
    aux_res = await request(app).post('/customer/create').send(customer_mock);
    const { customer_id } = aux_res.body;
    return {
        product_id,
        customer_id,
        rent_days: 5,
        returned: false,
    };
};

const saleMock = async () => {
    const product_mock = productMock();
    let aux_res = await request(app).post('/product/create').send(product_mock);
    const { product_id } = aux_res.body;

    const customer_mock = customerMock();
    aux_res = await request(app).post('/customer/create').send(customer_mock);
    const { customer_id } = aux_res.body;
    return {
        product_id,
        customer_id,
    };
};

export { customerMock, productMock, rentalMock, saleMock };
