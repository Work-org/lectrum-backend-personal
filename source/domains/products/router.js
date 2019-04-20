// Core
import express from 'express';

// Handlers
import * as handlers from './';

const route = express.Router();

route.get('/products', handlers.get);
route.post('/products', handlers.post);

route.get('/products/:hash', handlers.getProduct);
route.put('/products/:hash', handlers.putProduct);
route.delete('/products/:hash', handlers.deleteProduct);

export { route as products }