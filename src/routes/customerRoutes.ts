import { Router } from 'express';
import customerController from '../controllers/CustomerController';
import CustomerSchemas from '../middleware/schemas/customerSchemas';
import validateSchema from '../middleware/validateSchemas';

const router: Router = Router();

router.post('/create', validateSchema(CustomerSchemas.createSchema()), customerController.create);
router.put('/update/:customer_id', validateSchema(CustomerSchemas.updateSchema()), customerController.update);
router.delete('/delete/:customer_id', customerController.delete);

router.get('/findAll', customerController.findAll);
router.get('/findOne/:customer_id', customerController.findOne);

export default router;
