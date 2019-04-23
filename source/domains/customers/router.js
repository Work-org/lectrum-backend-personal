// Core
import express from 'express';

// Handlers
import * as handlers from './';
import { authenticate, can } from '_@source/helpers';

const route = express.Router();

route.get('/', [ authenticate, can('staff'),  handlers.get ]);
route.post('/', handlers.post);

route.get('/:hash', [ authenticate, handlers.getCustomer ]);
route.put('/:hash', [ authenticate, handlers.putCustomer ]);
route.delete('/:hash', [ authenticate, handlers.deleteCustomer ]);

export { route as customers };
