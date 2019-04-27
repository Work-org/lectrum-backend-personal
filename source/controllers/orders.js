// Instruments
import {
    Orders as OrdersModel,
    Customers, Products,
} from '../models';
import { PurchaseError } from '_@source/helpers/errors';

export class Orders {
    constructor(data) {
        this.models = {
            orders:    new OrdersModel(data),
            customers: new Customers(),
            products:  new Products(),
        };
    }

    async createOrder () {
        const { uid, pid, count } = this.models.orders.data;

        const customer = await this.models.customers.getById(uid);
        if (!customer) {
            throw new PurchaseError(1, 'authorize error');
        }

        const product = await this.models.products.getById(pid);
        if (!product) {
            throw new PurchaseError(2, 'Product not exist');
        }

        if (count > product.total) {
            throw new PurchaseError(3, 'Quantity exceeded');
        }

        const hash = await this.models.orders.create();
        this.models.products.setData({ total: product.total - count });
        const productNew = await this.models.products.update();

        if (!productNew) {
            throw new PurchaseError(4, 'Something wrong');
        }

        return { data: { hash }};
    }

    async getOrders () {
        const data = await this.models.orders.getMany();

        return { data };
    }

    async getOrder (hash) {
        const data = await this.models.orders.getOne(hash);

        return data;
    }

    async updateOrder (hash) {
        const data = await this.models.orders.update(hash);

        return data;
    }

    async deleteOrder (hash) {
        const data = await this.models.orders.remove(hash);

        return data;
    }
}
