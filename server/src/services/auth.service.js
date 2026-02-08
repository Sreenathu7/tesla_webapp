import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma.js';

class AuthService {
    async register(userData) {
        const { email, password, name } = userData;
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) throw new Error('User already exists');

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { email, password: hashedPassword, name }
        });

        const token = this.generateToken(user.id);
        return { user: this.formatUser(user), token };
    }

    async login(credentials) {
        const { email, password } = credentials;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error('Invalid credentials');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid credentials');

        const token = this.generateToken(user.id);
        return { user: this.formatUser(user), token };
    }

    generateToken(id) {
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
