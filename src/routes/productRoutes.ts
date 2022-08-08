import { Router } from 'express';
import productController from '../controllers/ProductController';
import ProductSchemas from '../middleware/schemas/productSchemas';
import validateSchema from '../middleware/validateSchemas';

const router: Router = Router();

router.post('/create', validateSchema(ProductSchemas.createSchema()), productController.create);
router.put('/update/:product_id', validateSchema(ProductSchemas.updateSchema()), productController.update);
router.delete('/delete/:product_id', productController.delete);

router.get('/findAll', productController.findAll);
router.get('/findOne/:product_id', productController.findOne);

export default router;
