// Core
import express from 'express';

// Handlers
import * as handlers from './';

const route = express.Router();

route.get('/customers', handlers.get);
route.post('/customers', handlers.post);

route.get('/customers/:hash', handlers.getCustomer);
route.put('/customers/:hash', handlers.putCustomer);
route.delete('/customers/:hash', handlers.deleteCustomer);

export { route as customers };
