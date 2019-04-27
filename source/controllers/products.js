import { Products as ProductsModel } from '../models';

export class Products {
    constructor(data) {
        this.models = {
            products: new ProductsModel(data),
        };
    }

    async createProduct () {
        const hash = await this.models.products.create();

        return { data: {hash}};
    }

    async getProducts () {
        const data = await this.models.products.getMany();

        return { data };
    }

    async getProduct (hash) {
        const data = await this.models.products.getOne(hash);

        return { data };
    }

    async updateProduct (hash) {
        const data = await this.models.products.update(hash);

        return data;
    }

    async deleteProduct (hash) {
        const data = await this.models.products.remove(hash);

        return data;
    }
}
