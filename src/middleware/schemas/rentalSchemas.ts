import { boolean, number, object } from 'yup';

class RentalSchemas {
    createSchema() {
        return object({
            body: object({
                customer_id: number().required('Rental "customer_id" is required'),
                product_id: number().required('Rental "product_id" is required'),
                rent_days: number()
                    .positive('Rental "rent_days" must be > 0')
                    .required('Rental "rent_days" is required'),
            }),
        });
    }

    updateSchema() {
        return object({
            body: object({
                customer_id: number(),
                product_id: number(),
                returned: boolean().required('Rental "returned" is required'),
            }),
        });
    }
}
export default new RentalSchemas();
