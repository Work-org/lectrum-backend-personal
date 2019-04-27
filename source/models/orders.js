// Instruments
import { orders } from '../odm';

export class Orders {
    constructor(data) {
        this.data = data;
    }

    async create () {
        const { uid, pid, count, comment } = this.data;

        try {
            const { hash } = await orders.create({
                uid, pid, count, comment,
            });

            return hash;
        } catch (error) {
            return null;
        }
    }

    async getMany () {
        const data = await orders.find()
            .populate({ path: 'product', select: 'title price discount -_id' })
            .populate({ path: 'customer', select: 'name phones -_id' })
            .select('-count -comment -_id')
            .lean({virtuals: true});

        return { data };
    }

    async getOne (hash) {
        const order = await orders.findOne({ hash })
            .populate({ path: 'product', select: 'title price discount -_id' })
            .populate({ path: 'customer', select: 'name phones -_id' })
            .select('-count -comment -_id')
            .lean({virtuals: true});

        return order;
    }

    async update (hash) {
        const { uid, pid, count, comment } = this.data;

        const result = await orders.findOneAndUpdate({ hash }, {
            $set: {
                uid, pid, count, comment,
            },
        });

        return result;
    }

    async remove (hash) {
        const result = await orders.deleteOne({ hash });

        return result;
    }
}
