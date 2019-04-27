// Core
import dg from 'debug';

// Instruments
import { Products } from '_@source/controllers';
import { BadRequestError } from '../../helpers/errors';

const debug = dg('router:products');

export const get = async (req, res) => {
    try {
        const product = new Products();
        const products = await product.getProducts();

        res.status(200).json(products);
    } catch (error) {
        debug(error.message);
        throw error;
    }
};

export const post = async (req, res) => {
    try {
        const { title, description, price, discount, total } = req.body;
        const product = new Products({ title, description, price, discount, total });
        const data = await product.createProduct();

        res.status(201).json(data);
    } catch (error) {
        debug(error.message);
        throw error;
    }
};

export const getProduct = async (req, res) => {
    try {
        const { hash } = req.params;

        if (!hash || [ 'null', 'undefined' ].includes(hash)) {
            throw new BadRequestError('Parameters hash error');
        }

        const product = new Products();
        const data = await product.getProduct(hash);

        res.status(201).json(data);
    } catch (error) {
        debug(error.message);
        throw error;
    }
};

export const putProduct = async (req, res) => {
    try {
        const { hash } = req.params;

        if (!hash || [ 'null', 'undefined' ].includes(hash)) {
            throw new BadRequestError('Parameters hash error');
        }

        const { title, description, price, discount, total } = req.body;
        const product = new Products({ title, description, price, discount, total });
        const data = await product.updateProduct();

        res.status(200).json(data);
    } catch (error) {
        debug(error.message);
        throw error;
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { hash } = req.params;

        if (!hash || [ 'null', 'undefined' ].includes(hash)) {
            throw new BadRequestError('Parameters hash error');
        }

        const product = new Products();
        await product.deleteProduct(hash);

        res.sendStatus(204);
    } catch (error) {
        debug(error.message);
        throw error;
    }
};

