const send = (res, status, data) => res.status(status).send(data);


const handle400 = function(res, e = 'Bad Request, Invalid Parameters') {
    return send(res, 400, { status: false, message: e });
};

const handle401 = function(res, e = 'Request Unauthorized') {
    return send(res, 401, { status: false, message: e });
};

const handle404 = function(res, e = 'Resource Not Found') {
    return send(res, 404, { status: false, message: e });
};

const handle403 = function(res, e = 'Request Forbidden') {
    return send(res, 403, { status: false, message: e });
};

const handle500 = function(res, e = 'Sorry, An Error occurred while completing your request. Please try again.') {
    return send(res, 500, { status: false, message: e });
};

const handle200 = function(res, data) {
    return send(res, 200, { status: true, data });
};


const handle201 = function(res, data) {
    return send(res, 201, { status: true, data });
};


const responseHandler = (code, res, data) => {
    let ret;
    switch (code) {
            case 201:
                ret = handle201(res, data);
                break;
            case 200:
                ret = handle200(res, data);
                break;
            case 400:
                ret = handle400(res, data);
                break;
            case 401:
                ret = handle401(res, data);
                break;
            case 403:
                ret = handle403(res, data);
                break;
            case 404:
                ret = handle404(res, data);
                break;
            case 500:
                ret = handle500(res, data);
                break;
            default:
                ret = handle200(res, {});
    }
    return ret;
};

module.exports = responseHandler;
