// Core
import dg from 'debug';

const debug = dg('router:orders');

export const get = (req, res) => {
    debug('get');
    res.status(200).json({ data: []});
};

export const post = (req, res) => {
    debug('post');
    res.status(200).json({ });
};

export const getOrder = (req, res) => {
    debug('getOrder');
    res.status(200).json({ data: {} });
};

export const putOrder = (req, res) => {
    debug('putOrder');
    res.status(200).json({ data: {} });
};

export const deleteOrder = (req, res) => {
    debug('deleteOrder');
    res.sendStatus(204);
};

