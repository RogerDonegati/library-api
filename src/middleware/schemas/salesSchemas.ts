import { number, object } from 'yup';

class SalesSchemas {
    createSchema() {
        return object({
            body: object({
                customer_id: number().required('Sale "customer_id" is required'),
                product_id: number().required('Sale "product_id" is required'),
            }),
        });
    }

    updateSchema() {
        return object({
            body: object({
                customer_id: number(),
                product_id: number(),
            }),
        });
    }
}
export default new SalesSchemas();
