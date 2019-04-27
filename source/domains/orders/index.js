// Core
import dg from 'debug';

// Instruments
import { Orders } from '_@source/controllers';
import { BadRequestError } from '../../helpers/errors';

const debug = dg('router:orders');

export const get = async (req, res) => {
    try {
        const orders = new Orders();
        const data = await orders.getOrders();
        res.status(200).json(data);
    } catch (error) {
        debug(error.message);
        throw error;
    }
};

export const post = async (req, res) => {
    try {
        const { uid, pid, count, comment } = req.body;
        const orders = new Orders({ uid, pid, count, comment });
        const data = await orders.createOrder();

        res.status(201).json(data);
    } catch (error) {
        const {message, name, purchaseErrorCode, data} = error;
        debug(message);
        if (name === 'PurchaseError') {
            switch (purchaseErrorCode) {
                case 1:
                case 2:
                case 3:
                    throw error;

                // rollback order create
                case 4: {
                    const orders = new Orders();
                    await orders.deleteOrder(data);
                    throw error;
                }

                default: throw error;
            }
        }
    }
};

export const getOrder = async (req, res) => {
    try {
        const { hash } = req.params;

        if (!hash || [ 'null', 'undefined' ].includes(hash)) {
            throw new BadRequestError('Parameters hash error');
        }

        const order = new Orders();
        const data = await order.getOrder(hash);

        res.status(201).json(data);
    } catch (error) {
        debug(error.message);
        throw error;
    }
};

export const putOrder = async (req, res) => {
    try {
        const { hash } = req.params;

        if (!hash || [ 'null', 'undefined' ].includes(hash)) {
            throw new BadRequestError('Parameters hash error');
        }

        const { pid, uid, count, comment } = req.body;
        const orders = new Orders({ pid, uid, count, comment });
        const data = await orders.updateOrder(hash);

        res.status(200).json(data);
    } catch (error) {
        debug(error.message);
        throw error;
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const { hash } = req.params;

        if (!hash || [ 'null', 'undefined' ].includes(hash)) {
            throw new BadRequestError('Parameters hash error');
        }

        const orders = new Orders();
        await orders.deleteOrder(hash);

        res.sendStatus(204);
    } catch (error) {
        debug(error.message);
        throw error;
    }
};

