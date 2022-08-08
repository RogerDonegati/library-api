import { Request, Response } from 'express';
import CustomerModel from '../models/customerModel';
import ProductModel from '../models/productModel';
import SaleModel from '../models/saleModel';

class SaleController {
    async findAll(req: Request, res: Response) {
        try {
            const sales = await SaleModel.findAll();
            if (sales.length > 0) {
                return res.status(200).json(sales);
            }
            return res.status(204).send();
        } catch (e: any) {
            return res.status(500).json(null);
        }
    }

    async findOne(req: Request, res: Response) {
        try {
            const { sale_id } = req.params;
            const sale = await SaleModel.findByPk(sale_id);
            if (sale) {
                return res.status(200).json(sale);
            }
            return res.status(400).json(['Sale not found']);
        } catch (e: any) {
            return res.status(500).json(null);
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { customer_id, product_id } = req.body;
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
            const { sell_price, units, sell }: any = product;
            if (units <= 0) {
                return res.status(400).json(['0 unit avaliable for sale']);
            }
            if (!sell) {
                return res.status(400).json(['Product not avaliable for sale']);
            }
            // perform sale
            product.decrement('units', { by: 1 });
            await product.save();
            const new_sale = await SaleModel.create({
                customer_id,
                product_id,
                sold_price: sell_price,
            });
            return res.status(201).json(new_sale);
        } catch (e: any) {
            return res.status(400).json({
                errors: e.errors.map((err: any) => err.message),
            });
        }
    }

    async update(req: Request, res: Response) {
        try {
            // const { sale_id } = req.params;
            // const sale = await SaleModel.findByPk(sale_id);
            // if (sale) {
            //     const updated_sale = await sale.update(req.body);
            //     return res.status(200).json(updated_sale);
            // }
            return res.status(405).json(['Update sales isn`t allowed']);
        } catch (e: any) {
            console.log(e);
            return res.status(400).json({
                errors: e.errors.map((err: any) => err.message),
            });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { sale_id } = req.params;
            const sale = await SaleModel.findByPk(sale_id);
            if (sale) {
                await sale.destroy();
                return res.status(204).send();
            }
            return res.status(400).json(['Sale not found']);
        } catch (e: any) {
            return res.status(500).json(null);
        }
    }
}

export default new SaleController();
