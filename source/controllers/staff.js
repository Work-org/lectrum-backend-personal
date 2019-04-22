import { Staff as StaffModel } from '../models';

export class Staff {
    constructor(data) {
        this.models = {
            staff: new StaffModel(data),
        };
    }

    async register () {
        const hash = await this.models.staff.register();

        return { data: { hash } };
    }

    async login() {
        const data = await this.models.staff.login();

        return data;
    }

    async readStaff() {
        const reads = await this.models.staff.getStaffs();

        return { data: reads };
    }
}
