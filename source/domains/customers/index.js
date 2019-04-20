// Core
import dg from 'debug';

const debug = dg('router:customer');

export const post = (req, res) => {
    debug('post');
    res.status(200).json({});
};

export const get = (req, res) => {
    debug('get');
    res.status(200).json({ data: []});
};

export const getCustomer = (req, res) => {
    debug('getCustomer');
    res.status(200).json({ data: {}});
};

export const putCustomer = (req, res) => {
    debug('put');
    res.status(200).json({ data: {}});
};

export const deleteCustomer = (req, res) => {
    debug('delete');
    res.sendStatus(204);
};