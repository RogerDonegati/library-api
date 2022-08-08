import { DataTypes } from 'sequelize';
import db from '../db/database';

const ProductsModel = db.define('products', {
    product_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    synopsis: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    units: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: {
                msg: 'products.units must be Integer type',
            },
        },
    },
    book: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
            isIn: {
                args: [[true, false]],
                msg: 'products.book must be BOOLEAN type',
            },
        },
    },
    movie: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
            isIn: {
                args: [[true, false]],
                msg: 'products.movie must be BOOLEAN type',
            },
        },
    },
    tv_show: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
            isIn: {
                args: [[true, false]],
                msg: 'products.tv_show must be BOOLEAN type',
            },
        },
    },
    sell: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
            isIn: {
                args: [[true, false]],
                msg: 'products.sell must be BOOLEAN type',
            },
        },
    },
    rent: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
            isIn: {
                args: [[true, false]],
                msg: 'products.rent must be BOOLEAN type',
            },
        },
    },
    sell_price: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
            isFloat: {
                msg: 'products.sell_price must be FLOAT type',
            },
        },
    },
    rent_price: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
            isFloat: {
                msg: 'products.rent_price must be FLOAT type',
            },
        },
    },
});

export default ProductsModel;
