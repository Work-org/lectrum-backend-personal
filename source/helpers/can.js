// Instruments
import { ForbiddenError } from './';

export const can = (who) => (req, res, next) => {
    const { _usr } = req.session.user;
    let roles = who;

    if (!Array.isArray(who)) {
        roles = [ who ];
    }

    if (roles.includes(_usr)) {
        next();
    } else {
        next(new ForbiddenError('You do not have access to resource'));

        // res.status(403).json({ message: 'You do not have access to resource' });
    }
};
