import { Router } from 'express';
import saleController from '../controllers/SaleController';

const router: Router = Router();

router.post('/create', saleController.create);
router.put('/update/:sale_id', saleController.update);
router.delete('/delete/:sale_id', saleController.delete);

router.get('/findAll', saleController.findAll);
router.get('/findOne/:sale_id', saleController.findOne);

export default router;
