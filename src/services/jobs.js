const JobModel = require('../models/Job')

class Jobs {

    async getAll() {
        try {
            const result = await JobModel.find()
            return result
        } catch (error) {
            return error
        }
    }

    async create(data) {
        try {
            const result = await JobModel.create(data)
            return result
        } catch (error) {
            return error
        }
    }

    async delete(id) {
        try {
            const result = await JobModel.findByIdAndDelete(id)
            return result
        } catch (error) {
            return error
        }
    }

}

module.exports = Jobs   