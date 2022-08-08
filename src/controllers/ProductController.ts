import { Request, Response } from 'express';
import { Op } from 'sequelize';
import ProductModel from '../models/productModel';

class ProductController {
    async findAll(req: Request, res: Response) {
        try {
            const { title, book, movie, tv_show } = req.body;
            const where = {};
            if (typeof book !== 'undefined') {
                Object.assign(where, { book });
            }
            if (typeof movie !== 'undefined') {
                Object.assign(where, { movie });
            }
            if (typeof tv_show !== 'undefined') {
                Object.assign(where, { tv_show });
            }
            if (typeof title !== 'undefined') {
                Object.assign(where, { title: { [Op.like]: `${title}%` } });
            }

            const products = await ProductModel.findAll({ where });
            if (products.length > 0) {
                return res.status(200).json(products);
            }
            return res.status(204).send();
        } catch (e: any) {
            return res.status(500).json(null);
        }
    }

    async findOne(req: Request, res: Response) {
        try {
            const { product_id } = req.params;
            const product = await ProductModel.findByPk(product_id);
            if (product) {
                return res.status(200).json(product);
            }
            return res.status(400).json(['Product not found']);
        } catch (e: any) {
            return res.status(500).json(null);
        }
    }

    async create(req: Request, res: Response) {
        try {
            const new_product = await ProductModel.create(req.body);
            return res.status(201).json(new_product);
        } catch (e: any) {
            return res.status(400).json({
                errors: e.errors.map((err: any) => err.message),
            });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { product_id } = req.params;
            const product = await ProductModel.findByPk(product_id);
            if (product) {
                const updated_product = await product.update(req.body);
                return res.status(200).json(updated_product);
            }
            return res.status(400).json(['Product not found']);
        } catch (e: any) {
            return res.status(400).json({
                errors: e.errors.map((err: any) => err.message),
            });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { product_id } = req.params;
            const product = await ProductModel.findByPk(product_id);
            if (product) {
                await product.destroy();
                return res.status(204).send();
            }
            return res.status(400).json(['Product not found']);
        } catch (e: any) {
            return res.status(500).json(null);
        }
    }
}

export default new ProductController();
