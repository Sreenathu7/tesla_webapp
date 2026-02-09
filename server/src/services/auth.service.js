import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { BaseService } from './BaseService.js';
import { UserRepository } from '../repositories/UserRepository.js';

class AuthService extends BaseService {
    constructor(repository = new UserRepository()) {
        super(repository);
    }

    async register(userData) {
        const { email, password, name } = userData;

        console.log('if user exists:', email);
        const existingUser = await this.repository.findByEmail(email);

        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        console.log('Creating user in database:', email);
        const user = await this.repository.createUser({
            email,
            password: hashedPassword,
            name
        });

        const token = this.generateToken(user.id);
        console.log(' user registered successfully:', email);

        return {
            user: this.formatUser(user),
            token
        };
    }

    async login(credentials) {
        const { email, password } = credentials;

        console.log(' user:', email);
        const user = await this.repository.findByEmail(email);

        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        const token = this.generateToken(user.id);
        console.log('Login successful:', email);

        return {
            user: this.formatUser(user),
            token
        };
    }

    generateToken(id) {
        console.log('→ Generating JWT token for user ID:', id);
        return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    }

    formatUser(user) {
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        };
    }
}

export default new AuthService();
