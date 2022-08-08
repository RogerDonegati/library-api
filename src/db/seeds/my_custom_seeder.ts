// Workaround since sequelize don't fully supports ts apparently

import CustomerModel from '../../models/customerModel';
import ProductModel from '../../models/productModel';
import RentalModel from '../../models/rentalModel';
import SaleModel from '../../models/saleModel';
import db from '../database';
import customer_seeds from './customer_seeds';
import product_seeds from './product_seeds';

async function seed() {
    // init database
    await db.sync();
    ProductModel.bulkCreate(product_seeds);
    CustomerModel.bulkCreate(customer_seeds);
    RentalModel.bulkCreate([]);
    SaleModel.bulkCreate([]);
}

seed();
