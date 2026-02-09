import { BaseController } from './BaseController.js';
import authService from '../services/auth.service.js';

class AuthController extends BaseController {
    constructor(service = authService) {
        super(service);
    }

    register = this.asyncHandler(async (req, res) => {
        const result = await this.service.register(req.body);
        this.handleSuccess(res, result, 201);
    });

    login = this.asyncHandler(async (req, res) => {
        const result = await this.service.login(req.body);
        this.handleSuccess(res, result);
    });
}

export default new AuthController();
