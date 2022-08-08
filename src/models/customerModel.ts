import { DataTypes } from 'sequelize';
import db from '../db/database';

const CustomersModel = db.define('customers', {
    customer_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'customers.email must match email type',
            },
        },
    },
    document_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birth_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true,
        },
    },
});

export default CustomersModel;
