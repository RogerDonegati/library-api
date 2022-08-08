import { Request, Response } from 'express';
import CustomerModel from '../models/customerModel';

class CustomerController {
    async findAll(req: Request, res: Response) {
        try {
            const customers = await CustomerModel.findAll();
            if (customers.length > 0) {
                return res.status(200).json(customers);
            }
            return res.status(204).send();
        } catch (e: any) {
            return res.status(500).json(null);
        }
    }

    async findOne(req: Request, res: Response) {
        try {
            const { customer_id } = req.params;
            const customer = await CustomerModel.findByPk(customer_id);
            if (customer) {
                return res.status(200).json(customer);
            }
            return res.status(400).json(['Customer not found']);
        } catch (e: any) {
            return res.status(500).json(null);
        }
    }

    async create(req: Request, res: Response) {
        try {
            const new_customer = await CustomerModel.create(req.body);
            return res.status(201).json(new_customer);
        } catch (e: any) {
            return res.status(400).json({
                errors: e.errors.map((err: any) => err.message),
            });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { customer_id } = req.params;
            const customer = await CustomerModel.findByPk(customer_id);
            if (customer) {
                const updated_customer = await customer.update(req.body);
                return res.status(200).json(updated_customer);
            }
            return res.status(400).json(['Customer not found']);
        } catch (e: any) {
            return res.status(400).json({
                errors: e.errors.map((err: any) => err.message),
            });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { customer_id } = req.params;
            const customer = await CustomerModel.findByPk(customer_id);
            if (customer) {
                await customer.destroy();
                return res.status(204).send();
            }
            return res.status(400).json(['Customer not found']);
        } catch (e: any) {
            return res.status(500).json(null);
        }
    }
}

export default new CustomerController();
