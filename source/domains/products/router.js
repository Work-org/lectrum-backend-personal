// Core
import express from 'express';

// Handlers
import * as handlers from './';

const route = express.Router();

route.get('/', handlers.get);
route.post('/', handlers.post);

route.get('/:hash', handlers.getProduct);
route.put('/:hash', handlers.putProduct);
route.delete('/:hash', handlers.deleteProduct);

export { route as products }