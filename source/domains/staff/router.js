// Core
import express from 'express';

// Handlers
import * as handlers from './';

const route = express.Router();

route.get('/staff', handlers.get);
route.post('/staff', handlers.post);

export { route as staff }