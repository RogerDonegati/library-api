import { Router } from 'express';
import rentalController from '../controllers/RentalController';
import RentalSchemas from '../middleware/schemas/rentalSchemas';
import validateSchema from '../middleware/validateSchemas';

const router: Router = Router();

router.post('/create', validateSchema(RentalSchemas.createSchema()), rentalController.create);
router.put('/update/:rental_id', validateSchema(RentalSchemas.updateSchema()), rentalController.update);
router.delete('/delete/:rental_id', rentalController.delete);

router.get('/findAll', rentalController.findAll);
router.get('/findOne/:rental_id', rentalController.findOne);

export default router;
