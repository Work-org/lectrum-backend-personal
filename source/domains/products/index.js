// Core
import dg from 'debug';

const debug = dg('router:products');

export const get = (req, res) => {
    debug('get');
    res.status(200).json({ data: []});
};

export const post = (req, res) => {
    debug('post');
    res.status(200).json({ });
};

export const getProduct = (req, res) => {
    debug('getProduct');
    res.status(200).json({ data: {} });
};

export const putProduct = (req, res) => {
    debug('putProduct');
    res.status(200).json({ data: {} });
};

export const deleteProduct = (req, res) => {
    debug('deleteProduct');
    res.sendStatus(204);
};

