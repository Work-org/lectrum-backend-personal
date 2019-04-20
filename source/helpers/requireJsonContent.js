export const requireJsonContent = (req, res, next) => {
    if ([ 'GET', 'DELETE', 'OPTIONS', 'HEADER' ].includes(req.method)) {
        return next();
    }

    if (req.headers[ 'content-type' ] !== 'application/json') {
        return res
            .status(400)
            .send(
                `Server requires content-type header equal to application/json but received ${
                    req.headers[ 'content-type' ]
                }`,
            );
    }

    next();
};
