import { DataTypes } from 'sequelize';
import db from '../db/database';

const RentSellModel = db.define('rentals', {
    rental_id: {
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
                msg: 'rentals.customer_id must be Integer type',
            },
        },
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: {
                msg: 'rentals.product_id must be Integer type',
            },
        },
    },
    rent_days: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: {
                msg: 'rentals.rent_days must be Integer type',
            },
        },
    },
    rent_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: false,
        validate: {
            isFloat: {
                msg: 'rentals.rent_price must be FLOAT type',
            },
        },
    },
    total_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: false,
        validate: {
            isFloat: {
                msg: 'rentals.total_price must be FLOAT type',
            },
        },
    },
    returned: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
            isIn: {
                args: [[true, false]],
                msg: 'rentals.returned must be BOOLEAN type',
            },
        },
    },
});

export default RentSellModel;
