// Core
import express from 'express';

// Handlers
import * as handlers from './';
import { authenticate, can } from '_@source/helpers';

const route = express.Router();
const mdlwr = [ authenticate, can([ 'staff', 'customers' ]) ];

route.get('/', mdlwr.concat(handlers.get));
route.post('/', mdlwr.concat(handlers.post));

route.get('/:hash', mdlwr.concat(handlers.getOrder));
route.put('/:hash', mdlwr.concat(handlers.putOrder));
route.delete('/:hash', mdlwr.concat(handlers.deleteOrder));

export { route as orders };
