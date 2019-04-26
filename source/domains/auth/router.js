// Core
import express from 'express';

// Instruments
import { limiter } from '../../helpers';

// Handlers
import * as authenticate from './';

const route = express.Router();
const timeout = 60 * 1000; // 1 min

route.post('/login', [ limiter(100, timeout) ], authenticate.post);
route.post('/logout', authenticate.postLogout);

export { route as auth };
