export class BaseRepository {
    constructor(model) {
        if (!model) {
            throw new Error('Model is required for BaseRepository');
        }
        this.model = model;
    }

    async findAll(options = {}) {
        return await this.model.findMany(options);
    }

    async findById(id) {
        return await this.model.findUnique({
            where: { id: parseInt(id) }
        });
    }

    async findUnique(where) {
        return await this.model.findUnique({ where });
    }

    async create(data) {
        return await this.model.create({ data });
    }

    async update(id, data) {
        return await this.model.update({
            where: { id: parseInt(id) },
            data
        });
    }

    async delete(id) {
        return await this.model.delete({
            where: { id: parseInt(id) }
        });
    }

    async count(where = {}) {
        return await this.model.count({ where });
    }

    async findMany(options) {
        return await this.model.findMany(options);
    }
}
