// Core
import express from 'express';

// Handlers
import * as handlers from './';

const route = express.Router();

route.get('/', handlers.get);
route.post('/', handlers.post);

route.get('/:hash', handlers.getCustomer);
route.put('/:hash', handlers.putCustomer);
route.delete('/:hash', handlers.deleteCustomer);

export { route as customers };
