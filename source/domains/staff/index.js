// Core
import dg from 'debug';

// Instrument
import { User } from '_@source/controllers';
import { BadRequestError } from '_@source/helpers/errors';

const debug = dg('router:staff');

export const get = async (req, res) => {
    try {
        const staff = new User().as('staff');
        const staffs = await staff.readStaff();

        res.status(200).json(staffs);
    } catch (error) {
        res.status(500).json({ message: error.message, stack: error.stack });
    }
};

export const post = async (req, res) => {
    const data = req.body;
    if (!data) {
        throw new BadRequestError('Empty data staff');
    }

    try {
        const staff = new User(data).as('staff');
        const newStaff = await staff.register();
        debug(`new staff [${newStaff.data.hash}] created`);
        res.status(201).json(newStaff);
    } catch (error) {
        res.status(500).json({ message: error.message, stack: error.stack });
    }
};
