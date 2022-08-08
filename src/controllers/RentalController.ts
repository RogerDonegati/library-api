import { Request, Response } from 'express';
import CustomerModel from '../models/customerModel';
import ProductModel from '../models/productModel';
import rentalModel from '../models/rentalModel';

class RentalController {
    async findAll(req: Request, res: Response) {
        try {
            const rentals = await rentalModel.findAll();
            if (rentals.length > 0) {
                return res.status(200).json(rentals);
            }
            return res.status(204).send();
        } catch (e: any) {
            return res.status(500).json(null);
        }
    }

    async findOne(req: Request, res: Response) {
        try {
            const { rental_id } = req.params;
            const rental = await rentalModel.findByPk(rental_id);
            if (rental) {
                return res.status(200).json(rental);
            }
            return res.status(400).json(['Rental not found']);
        } catch (e: any) {
            return res.status(500).json(null);
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { customer_id, product_id, rent_days } = req.body;
            // check customer
            const customer = await CustomerModel.findByPk(customer_id);
            if (!customer) {
                return res.status(400).json(['Customer not found']);
            }
            // check product
            const product = await ProductModel.findByPk(product_id);
            if (!product) {
                return res.status(400).json(['Product not found']);
            }
            const { rent_price, units, rent }: any = product;
            if (units <= 0) {
                return res.status(400).json(['0 unit avaliable for rental']);
            }
            if (!rent) {
                return res.status(400).json(['Product not avaliable for rental']);
            }
            // perform rental
            product.decrement('units', { by: 1 });
            await product.save();
            const new_rental = await rentalModel.create({
                customer_id,
                product_id,
                rent_days,
                rent_price,
                total_price: (rent_price * rent_days),
            });
            return res.status(201).json(new_rental);
        } catch (e: any) {
            console.log(e);
            return res.status(400).json({
                errors: e.errors.map((err: any) => err.message),
            });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { rental_id } = req.params;
            const { returned } = req.body;
            const rental = await rentalModel.findByPk(rental_id);
            if (rental) {
                const updated_rental = await rental.update({ returned });
                return res.status(200).json(updated_rental);
            }
            return res.status(400).json(['Rental not found']);
        } catch (e: any) {
            return res.status(400).json({
                errors: e.errors.map((err: any) => err.message),
            });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { rental_id } = req.params;
            const rental = await rentalModel.findByPk(rental_id);
            if (rental) {
                await rental.destroy();
                return res.status(204).send();
            }
            return res.status(400).json(['Rental not found']);
        } catch (e: any) {
            return res.status(500).json(null);
        }
    }
}

export default new RentalController();
