// Core
import dg from 'debug';

// Instruments
import { User } from '_@source/controllers';
import { BadRequestError, ForbiddenError } from '_@source/helpers/errors';

const debug = dg('router:customer');

export const get = async (req, res) => {
    try {
        const customers = new User().as('customer');
        const data = await customers.getCustomers();

        res.status(200).json(data);
    } catch (error) {
        debug(error.message);
        res.status(500).json({ message: error.message, stack: error.stack });
    }
};

export const post = async (req, res) => {
    const args = req.body;
    if (!args) {
        throw new BadRequestError('Empty data customers');
    }

    try {
        const customers = new User(args).as('customer');
        const data = await customers.createCustomer();

        res.status(201).json(data);
    } catch (error) {
        debug(error.message);
        res.status(500).json({ message: error.message, stack: error.stack });
    }
};

export const getCustomer = async (req, res) => {
    const { hash } = req.params;
    const { hash: hashUser } = req.session.user;
    const customers = new User().as('customer');

    if (!hash || [ 'null', 'undefined' ].includes(hash)) {
        throw new BadRequestError('Parameters hash error');
    }

    // Check to auth customer
    const user = customers.getUser(hashUser);
    if (!user || hash !== hashUser) {
        debug('access denied to not customer record');
        throw new ForbiddenError('Access denied');
    }

    try {
        const data = await customers.getCustomer(hashUser);

        res.status(200).json(data);
    } catch (error) {
        debug(error.message);
        res.status(500).json({ message: error.message, stack: error.stack });
    }
};

export const putCustomer = async (req, res) => {
    const { hash: hashUser } = req.session.user;
    const { hash } = req.params;
    const args = req.body;
    const customers = new User().as('customer');

    if (!args) {
        throw new BadRequestError('Empty data customers');
    }

    if (!hash) {
        throw new BadRequestError('Parameters hash error');
    }

    const user = await customers.getUser(hashUser);
    if (!user || hash !== hashUser) {
        debug('It\'s not you');
        throw new ForbiddenError('It\'s not you');
    }

    try {
        customers.setData(user);
        const data = await customers.updateCustomer(hashUser);

        res.status(200).json(data);
    } catch (error) {
        debug(error.message);
        res.status(500).json({ message: error.message, stack: error.stack });
    }
};

export const deleteCustomer = async (req, res) => {
    const { hash: hashUser } = req.session.user;
    const { hash } = req.params;
    const customers = new User().as('customer');

    if (!hash) {
        throw new BadRequestError('Parameters hash error');
    }

    const user = customers.getUser(hashUser);
    if (!user || hash !== hashUser) {
        throw new ForbiddenError('It\'s not you');
    }

    try {
        const customer = await customers.removeCustomer(hash);

        if (customer) {
            res.sendStatus(204);
            req.user = null;
        } else {
            debug('Delete error');
            res.status(500).json({ message: 'Delete error' });
        }
    } catch (error) {
        debug(error.message);
        res.status(500).json({ message: error.message, stack: error.stack });
    }
};
