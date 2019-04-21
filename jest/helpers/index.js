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

export { getData, getCreateResult, authorize };
