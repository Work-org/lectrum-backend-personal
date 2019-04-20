// Core
import express from 'express';

// Handlers
import * as handlers from './';

const route = express.Router();

route.get('/', handlers.get);
route.post('/', handlers.post);

export { route as staff };
