// Core
import express from 'express';

// Handlers
import * as handlers from './';
import { authenticate, can } from '_@source/helpers';

const route = express.Router();

route.get('/', handlers.get);
route.post('/', [ authenticate, can('staff'), handlers.post ]);

route.get('/:hash', handlers.getProduct);
route.put('/:hash', [ authenticate, can('staff'), handlers.putProduct ]);
route.delete('/:hash', [ authenticate, can('staff'), handlers.deleteProduct ]);

export { route as products };
