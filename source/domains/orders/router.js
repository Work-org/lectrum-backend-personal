// Core
import express from 'express';

// Handlers
import * as handlers from './';

const route = express.Router();

route.get('/', handlers.get);
route.post('/', handlers.post);


route.get('/:hash', handlers.getOrder);
route.put('/:hash', handlers.putOrder);
route.delete('/:hash', handlers.deleteOrder);

export { route as orders };
