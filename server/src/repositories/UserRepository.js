import { BaseRepository } from './BaseRepository.js';
import prisma from '../prisma.js';

export class UserRepository extends BaseRepository {
    constructor() {
        super(prisma.user);
    }

    async findByEmail(email) {
        return await this.model.findUnique({
            where: { email }
        });
    }

    async createUser(userData) {
        return await this.model.create({
            data: userData
        });
    }

    async updateUser(id, userData) {
        return await this.update(id, userData);
    }
}
