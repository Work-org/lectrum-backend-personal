import { Customers as CustomersModel } from '../models';

export class Customers {
    constructor(data) {
        this.models = {
            customers: new CustomersModel(data),
        };
    }

    async login() {
        try {
            const hash = await this.models.customers.login();

            return hash;
        } catch (error) {
            throw error;
        }
    }

    async createCustomer() {
        const data = await this.models.customers.createCustomer();

        return data;
    }

    async getCustomers() {
        const data = await this.models.customers.getCustomers();

        return data;
    }

    async getCustomer(hash) {
        const data = await this.models.customers.getCustomer(hash);

        return data;
    }

    async updateCustomer(hash) {
        const data = await this.models.customers.updateCustomer(hash);

        return data;
    }

    async removeCustomer(hash) {
        const data = await this.models.customers.removeCustomer(hash);

        return data;
    }
}
