import { date, object, string } from 'yup';

class CustomerSchemas {
    createSchema() {
        return object({
            body: object({
                name: string().required('Customer name is required'),
                email: string()
                    .email('Customer "email" must be a valid')
                    .required('Customer "email" is required'),
                document_id: string().required('Customer "document_id" is required'),
                birth_date: date().required('Customer "birth_date" is required'),
            }),
        });
    }

    updateSchema() {
        return object({
            body: object({
                name: string(),
                email: string()
                    .email('Customer "email" must be a valid'),
                document_id: string(),
                birth_date: date(),
            }),
        });
    }
}
export default new CustomerSchemas();
