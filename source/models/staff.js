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
console.log('-->', name);
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
        const { password: userPassword } = await staff
            .findOne({ email })
            .select('password hash')
            .lean();

        const match = await bcrypt.compare(password, userPassword);

        if (!match) {
            throw new Error('Credentials are not valid');
        }

        return true;
    }

    async getStaffs () {
        const staffs = await staff.find({})
            .select('-password -_usr -disabled -_id')
            .lean({virtuals: true});

        return staffs;
    }
}
