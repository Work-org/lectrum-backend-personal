// Core
import dg from 'debug';

// Instruments
import { Staff, Customers } from '../../controllers';
import { UnauthorizedError } from '_@source/helpers/errors';

const debug = dg('router:auth');

export const post = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ message: 'credentials are not valid' });
        }

        const [ , credentials ] = req.headers.authorization.split(' ');
        const [ email, password ] = Buffer.from(credentials, 'base64')
            .toString()
            .split(':');

        const staff = new Staff({ email, password });
        const hashStaff = await staff.login();

        if (hashStaff) {
            req.session.user = { hash: hashStaff };

            return res.sendStatus(204);
        }

        const customer = new Customers({ email, password });
        const hashCustomer = await customer.login();

        if (hashCustomer) {
            req.session.user = { hash: hashCustomer };

            return res.sendStatus(204);
        }

        res.status(401).json({ message: 'Credential incorrect' });
    } catch (error) {
        throw new UnauthorizedError(error.message);
    }
};
