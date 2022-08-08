import { DataTypes } from 'sequelize';
import db from '../db/database';

const RentSellModel = db.define('sales', {
    sale_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: {
                msg: 'sales.customer_id must be Integer type',
            },
        },
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: {
                msg: 'sales.product_id must be Integer type',
            },
        },
    },
    sold_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: false,
        validate: {
            isFloat: {
                msg: 'sales.sold_price must be FLOAT type',
            },
        },
    },
});

export default RentSellModel;
