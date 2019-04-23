// Core
import dg from 'debug';

// Instruments
import { Customers } from '_@source/controllers';
import { BadRequestError, ForbiddenError } from '_@source/helpers/errors';

const debug = dg('router:customer');

export const get = async (req, res) => {
    try {
        const customers = new Customers();
        const data = await customers.getCustomers();

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message, stack: error.stack });
    }
};

export const post = async (req, res) => {
    const args = req.body;
    if (!args) {
        throw new BadRequestError('Empty data customers');
    }

    try {
        const customers = new Customers(args);
        const data = await customers.createCustomer();

        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message, stack: error.stack });
    }
};

export const getCustomer = async (req, res) => {
    const { hash } = req.params;
    const {_usr, hash: hashUser } = req.user;

    if (!hash) {
        throw new BadRequestError('Parameters hash error');
    }

    if (_usr !== 'customer' || hash !== hashUser) {
        throw new ForbiddenError('Access denied');
    }

    try {
        const customers = new Customers();
        const data = await customers.getCustomer(hashUser);

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message, stack: error.stack });
    }
};

export const putCustomer = async (req, res) => {
    const {_usr, hash: hashUser } = req.user;
    const { hash } = req.params;
    const args = req.body;

    if (!args) {
        throw new BadRequestError('Empty data customers');
    }

    if (!hash) {
        throw new BadRequestError('Parameters hash error');
    }

    if (_usr !== 'customer' || hash !== hashUser) {
        throw new ForbiddenError('It\'s not you');
    }

    try {
        const customers = new Customers();
        const data = await customers.updateCustomer(hashUser);

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message, stack: error.stack });
    }
};

export const deleteCustomer = async (req, res) => {
    debug('delete');
    res.sendStatus(204);

    const {_usr, hash: hashUser } = req.user;
    const { hash } = req.params;

    if (!hash) {
        throw new BadRequestError('Parameters hash error');
    }

    if (_usr !== 'customer' || hash !== hashUser) {
        throw new ForbiddenError('It\'s not you');
    }

    try {
        const customers = new Customers();
        const customer = await customers.removeCustomer(hash);

        if (customer) {
            res.sendStatus(204);

            //@todo remove session?
            req.user = null;
        } else {
            res.status(500).json({ message: 'Delete error' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message, stack: error.stack });
    }
};
