export class BaseService {
    constructor(repository) {
        if (!repository) {
            throw new Error('Repository is required for BaseService');
        }
        this.repository = repository;
    }

    async getAll(options = {}) {
        return await this.repository.findAll(options);
    }

    async getById(id) {
        const entity = await this.repository.findById(id);
        if (!entity) {
            throw new Error('Entity not found');
        }
        return entity;
    }

    async create(data) {
        return await this.repository.create(data);
    }

    async update(id, data) {
        return await this.repository.update(id, data);
    }

    async delete(id) {
        return await this.repository.delete(id);
    }
}
