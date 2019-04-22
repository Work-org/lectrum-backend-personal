// DB_NAME from env
// use {{DB_NAME}}}
use backend_personal;

// upload to clear db
db.users.drop();

db.users.insert([
    // staff test
    {
        hash: '8544c1df-b199-44e4-86d5-25e10f09b764',
        name:  {
           first: 'John',
           last: 'Doe'
        },
        emails: [
            { email: "jdoe@email.com", primary: true },
            { email: "jdoe2@email.com", primary: false }
        ],
        phones: [
            { phone: "380975556677", primary: true },
            { phone: "380975556678", primary: false }
        ],
        // !<p@ssW0rd>
        password: "$2b$11$T0OfQjUdCvdYv2RTAp/SbuVgO1AcLbneX3rVZ2j0CPg1PxehjezBy",
        role:   "CEO",
        disabled: false,
        _usr: 'staff'
    },
    // customer test
    {
        hash: "9efc8ced-cbf0-4b01-83c7-073e8ad36b81",
        name:   {
            first: 'Jackie',
            last: 'Jan'
        },
        emails: [
            { email: "jchan@email.com", primary: true },
            { email: "jchan2@email.com", primary: false }
        ],
        phones: [
            { phone: "380931112233", primary: true },
            { phone: "380931112234", primary: false }
        ],
        city:    "gitomir",
        country: "ukraine",
        // !<p@ssW0rd>
        password: "$2b$11$T0OfQjUdCvdYv2RTAp/SbuVgO1AcLbneX3rVZ2j0CPg1PxehjezBy",
        _usr: 'customer'
    }
]);