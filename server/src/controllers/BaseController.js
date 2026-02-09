export class BaseController {
    constructor(service) {
        if (!service) {
            throw new Error('Service is required for BaseController');
        }
        this.service = service;
    }

    handleSuccess(res, data, statusCode = 200) {
        return res.status(statusCode).json(data);
    }

    handleError(res, error, statusCode = 500) {
        console.error(' Error:', error.message);
        return res.status(statusCode).json({
            error: error.message
        });
    }

    asyncHandler(fn) {
        return (req, res, next) => {
            Promise.resolve(fn.call(this, req, res, next))
                .catch((error) => {
                    this.handleError(res, error);
                });
        };
    }
}
