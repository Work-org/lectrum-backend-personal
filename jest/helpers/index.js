const getData = (response) => {
    return response.body.data || null;
};

const getCreateResult = (response) => {
    return response.body || null;
};

const authorize = async (done) => {
    await global.authorize((response) => {
        expect(response.statusCode).toBe(204);
    });
    done();
};

const regexpUUIDv4 = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

export { getData, getCreateResult, authorize, regexpUUIDv4 };
