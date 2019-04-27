// Instruments
import { customers } from '../odm';
import bcrypt from 'bcrypt';

export class Customers {
    constructor(data) {
        this.data = data;
    }

    async login() {
        const { email, password } = this.data;
        const customer = await customers
            .findOne({ emails: {$elemMatch: { email, primary: true }} })
            .select('password hash')
            .lean();

        if (!customer) {
            return null;
        }

        const match = await bcrypt.compare(password, customer.password);

        if (!match) {
            throw new Error('Credentials are not valid');
        }

        return customer.hash;
    }

    async create() {
        const { name, email, phone, city, country } = this.data;

        const [ first, last ] = name.split(' ');
        const { hash } = await customers.create({
            ...this.data,
            name:   { first, last },
            email:  [{email}],
            phones: [{phone}],
            city,
            country,
        });

        return hash;
    }

    async getMany() {
        const query = this._queries();
        const data = await query;

        return data;
    }

    async getOne(hash) {
        const query = this._query({ hash });
        const data = await query;

        return data;
    }

    async getById(id) {
        const query = this._query({ _id: id });
        const data = await query;

        return data;
    }

    async update(hash) {
        const update = this._update(this.data, hash);
        const data = await update;

        return data;
    }

    async remove(hash) {
        const result = await customers.deleteOne({ hash });

        return result;
    }

    _queries (condition = {}) {
        return customers.find(condition)
            .select('-password  -_id')
            .lean({virtuals: true});
    }

    _query (condition = {}) {
        return customers.findOne(condition)
            .select('-password  -_id')
            .lean({virtuals: true});
    }

    _update (data, hash) {
        const { name: { first, last }, emails, phones, city, country } = data;

        return customers.findOneAndUpdate({ hash }, {
            $set: {
                'name.first': first,
                'name.last':  last,
                city,
                country,
                emails,
                phones,
            },
        });
    }
}
