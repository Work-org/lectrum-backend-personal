// Core
import dg from 'debug';

// Instruments
// import { Staff } from '../../controllers';

const debug = dg('router:auth');

export const post = (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        if (!req.headers.authorization) {
            res.status(401).json({ message: 'credentials are not valid' });
        }

        const [ , credentials ] = req.headers.authorization.split(' ');
        const [ email, password ] = Buffer.from(credentials, 'base64')
            .toString()
            .split(':');

        // const staff = new Staff({ email, password });
        // const hash = await staff.login();

        // req.session.user = { hash };
        req.session.user = { email, password, _usr: 'staff' };
        res.sendStatus(204);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};
