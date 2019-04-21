// Core
import express from 'express';

// Handlers
import * as handlers from './';
import { authenticate, can } from '_@source/helpers';

const route = express.Router();

route.get('/', [ authenticate, can('staff'), handlers.get ]);
route.post('/', handlers.post);

export { route as staff };
