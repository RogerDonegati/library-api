import { boolean, number, object, string } from 'yup';

class ProductSchemas {
    createSchema() {
        return object({
            body: object({
                title: string().required('Product "title" is required'),
                genre: string().required('Product "genre" is required'),
                synopsis: string().required('Product "synopsis" is required'),
                author: string().required('Product "author" is required'),
                units: number()
                    .positive('Product "units" must be > 0')
                    .required('Product "units" is required'),
                book: boolean()
                    .test(
                        'book_validation',
                        'Product at least one type (book, movie, tv_show) must be true',
                        function validateBook(value) {
                            const { movie, tv_show } = this.parent;
                            if ((value) || (movie) || (tv_show)) return true;
                            return false;
                        },
                    ),
                movie: boolean()
                    .test(
                        'movie_validation',
                        'Product at least one type (book, movie, tv_show) must be true',
                        function validateMovie(value) {
                            const { book, tv_show } = this.parent;
                            if ((value) || (book) || (tv_show)) return true;
                            return false;
                        },
                    ),
                tv_show: boolean()
                    .test(
                        'book_validation',
                        'Product at least one type (book, movie, tv_show) must be true',
                        function validateTV_Show(value) {
                            const { movie, book } = this.parent;
                            if ((value) || (movie) || (book)) return true;
                            return false;
                        },
                    ),
                sell: boolean()
                    .test(
                        'sell_validation',
                        'Product "sell" or "rent" must true',
                        function validateSell(value) {
                            const { rent } = this.parent;
                            if ((value) || (rent)) return true;
                            return false;
                        },
                    ),
                rent: boolean()
                    .test(
                        'rent_validation',
                        'Product "sell" or "rent" must true',
                        function validateRent(value) {
                            const { sell } = this.parent;
                            if ((value) || (sell)) return true;
                            return false;
                        },
                    ),
                sell_price: number()
                    .when('sell', {
                        is: true,
                        then: number()
                            .positive('Product "sell_price" must be > 0')
                            .required('Product "sell_price" is required'),
                    }),
                rent_price: number()
                    .when('rent', {
                        is: true,
                        then: number()
                            .positive('Product "rent_price" must be > 0')
                            .required('Product "rent_price" is required'),
                    }),
            }),
        });
    }

    updateSchema() {
        return object({
            body: object({
                title: string(),
                genre: string(),
                synopsis: string(),
                author: string(),
                units: number()
                    .positive('Product "units" must be > 0'),
                book: boolean()
                    .test(
                        'book_validation',
                        'Product at least one type (book, movie, tv_show) must be true',
                        function validateBook(value) {
                            const { movie, tv_show } = this.parent;
                            if ((value) || (movie) || (tv_show)) return true;
                            if ((value === undefined) || (movie === undefined) || (tv_show === undefined)) return true;
                            return false;
                        },
                    ),
                movie: boolean()
                    .test(
                        'movie_validation',
                        'Product at least one type (book, movie, tv_show) must be true',
                        function validateMovie(value) {
                            const { book, tv_show } = this.parent;
                            if ((value) || (book) || (tv_show)) return true;
                            if ((value === undefined) || (book === undefined) || (tv_show === undefined)) return true;
                            return false;
                        },
                    ),
                tv_show: boolean()
                    .test(
                        'book_validation',
                        'Product at least one type (book, movie, tv_show) must be true',
                        function validateTV_Show(value) {
                            const { movie, book } = this.parent;
                            if ((value) || (movie) || (book)) return true;
                            if ((value === undefined) || (movie === undefined) || (book === undefined)) return true;
                            return false;
                        },
                    ),
                sell: boolean()
                    .test(
                        'sell_validation',
                        'Product "sell" or "rent" must true',
                        function validateSell(value) {
                            const { rent } = this.parent;
                            if ((value) || (rent)) return true;
                            if ((value === undefined) || (rent === undefined)) return true;
                            return false;
                        },
                    ),
                rent: boolean()
                    .test(
                        'rent_validation',
                        'Product "sell" or "rent" must true',
                        function validateRent(value) {
                            const { sell } = this.parent;
                            if ((value) || (sell)) return true;
                            if ((value === undefined) || (sell === undefined)) return true;
                            return false;
                        },
                    ),
                sell_price: number()
                    .when('sell', {
                        is: true,
                        then: number()
                            .positive('Product "sell_price" must be > 0'),
                    }),
                rent_price: number()
                    .when('rent', {
                        is: true,
                        then: number()
                            .positive('Product "sell_price" must be > 0'),
                    }),
            }),
        });
    }
}
export default new ProductSchemas();
