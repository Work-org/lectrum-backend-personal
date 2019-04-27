// Core
import bcrypt from 'bcrypt';

// Instruments
import { staff } from '../odm';

export class Staff {
    constructor(data) {
        this.data = data;
    }

    async register() {
        const { password, name, email, phone } = this.data;
        if (!password) {
            throw new Error('password not filled');
        }

        const [ first, last ] = name.split(' ');
        const hashedPassword = await bcrypt.hash(password, 11);
        const { hash } = await staff.create({
            ...this.data,
            password: hashedPassword,
            name:     { first, last },
            email:    [{email}],
            phones:   [{phone}],
        });

        return hash;
    }

    async login() {
        const { email, password } = this.data;
        const user = await staff
            .findOne({ emails: {$elemMatch: { email, primary: true }} })
            .select('password hash')
            .lean();

        if (!user) {
            return null;
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw new Error('Credentials are not valid');
        }

        return user.hash;
    }

    async getOne (hash) {
        const staffs = await staff.findOne({hash})
            .select('-password -disabled -_id')
            .lean({virtuals: true});

        return staffs;
    }

    async getMany () {
        const staffs = await staff.find({})
            .select('-password -disabled -_id')
            .lean({virtuals: true});

        return staffs;
    }
}
