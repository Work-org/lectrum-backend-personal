// Core
import dg from 'debug';

const debug = dg('router:staff');

export const get = (req, res) => {
    debug('get');
    res.status(200).json({ data: []});
};

export const post = (req, res) => {
    debug('post');
    res.status(200).json({ data: {} });
};