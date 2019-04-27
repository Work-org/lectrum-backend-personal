// Instruments
import { products } from '../odm';

export class Products {
    constructor(data) {
        this.data = data;
    }

    setData (data) {
        this.data = data;
    }

    async create () {
        const { title, descriptions, price, discount, total } = this.data;

        const { hash } = await products.create({
            title, descriptions, price, discount, total,
        });

        return hash;
    }

    async getMany () {
        const data = await products.find()
            .select('-total -_id')
            .lean({virtuals: true});

        return data;
    }

    async getOne (hash) {
        const product = await products.findOne({hash})
            .select('-total -_id')
            .lean({virtuals: true});

        return product;
    }

    async getById (id) {
        const product = await products.findOne({_id: id})
            .select('-total -_id')
            .lean({virtuals: true});

        return product;
    }

    async update (hash) {
        const { title, descriptions, price, discount, total } = this.data;

        const result = await products.findOneAndUpdate({ hash }, {
            $set: {
                title,
                descriptions,
                price,
                discount,
                total,
            },
        });

        return result;
    }

    async remove (hash) {
        const result = await products.deleteOne({ hash });

        return result;
    }
}
