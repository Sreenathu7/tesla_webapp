import authService from '../services/auth.service.js';

export const register = async (req, res) => {
    try {
        console.log(' Register request:', req.body.email);
        const result = await authService.register(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        console.log('Login request:', req.body.email);
        const result = await authService.login(req.body);
        res.json(result);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};
