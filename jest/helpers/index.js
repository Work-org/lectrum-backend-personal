const getData = (response) => {
    return response.body.data || null;
};

const getCreateResult = (response) => {
    return response.body || null;
};

const authorize = async () => {
    await global.authorize((response) => {
        expect(response.statusCode).toBe(204);
    });
};

export { getData, getCreateResult, authorize };
