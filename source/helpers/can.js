// Instruments
import { ForbiddenError } from './';

import { User } from '_@source/controllers';

export const can = (who) => async (req, res, next) => {
    const { hash } = req.session.user;
    let roles = who;

    if (!Array.isArray(who)) {
        roles = [ who ];
    }

    let _usr = null;
    let user = new User().as('customer');
    const customer = await user.getUser(hash);

    if (!customer) {
        user = user.as('staff');
        const staff = await user.getUser(hash);

        _usr = staff._usr;
    } else {
        _usr = customer._usr;
    }

    if (roles.includes(_usr)) {
        next();
    } else {
        next(new ForbiddenError('You do not have access to resource'));
    }
};
