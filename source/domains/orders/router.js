// Core
import express from 'express';

// Handlers
import * as handlers from './';

const route = express.Router();

route.get('/orders', handlers.get);
route.post('/orders', handlers.post);


route.get('/orders/:hash', handlers.getOrder);
route.put('/orders/:hash', handlers.putOrder);
route.delete('/orders/:hash', handlers.deleteOrder);

export { route as orders }