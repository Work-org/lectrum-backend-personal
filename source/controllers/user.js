import {
    Customers as CustomersModel,
    Staff as StaffModel,
} from '../models';

export class User {
    constructor(data) {
        this.type = 'staff';
        this.setData(data);

        return this;
    }

    as (type) {
        if ([ 'staff', 'customer' ].includes(type)) {
            this.type = type;
        } else {
            throw new Error('Type incorrect');
        }

        return this;
    }

    setData(data) {
        this.models = {
            customer: new CustomersModel(data),
            staff:    new StaffModel(data),
        };
    }

    async register() {
        if (this.type !== 'staff') {
            throw new Error('Only to staff');
        }

        const hash = await this.model.register();

        return { data: { hash } };
    }

    async readStaff() {
        const reads = await this.model.getMany();

        return { data: reads };
    }

    async login() {
        try {
            const hash = await this.model.login();

            return hash;
        } catch (error) {
            throw error;
        }
    }

    async createCustomer() {
        const data = await this.model.create();

        return data;
    }

    async getCustomers() {
        const data = await this.model.getMany();

        return data;
    }

    async getCustomer(hash) {
        const data = await this.model.getOne(hash);

        return data;
    }

    async updateCustomer(hash) {
        const data = await this.model.update(hash);

        return data;
    }

    async removeCustomer(hash) {
        const data = await this.model.remove(hash);

        return data;
    }

    async getUser (hash) {
        let user = null;

        switch (this.type) {
            case 'staff':
                user = await this.model.getOne(hash);
                break;
            case 'customer':
                user = await this.model.getOne(hash);
                break;

            default: throw new Error('Not correct type user');
        }

        return user;
    }

    get model () {
        if (!this.type) {
            throw new Error('Not specified type of user');
        }

        return this.models[ this.type ];
    }
}
