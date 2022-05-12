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

    async getOne(id) {
        try {
            const job = await JobModel.findById(id)
            return job
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

    async addAplicant(idAplicant, idJob) {
        try {
            const jobs = await JobModel.findOne({ _id: idJob })
            for (const item of jobs.aplicants) {
                if (item.valueOf() === idAplicant) return { message: 'Ya te postulaste' }
            }

            const result = await JobModel.updateOne({ _id: idJob }, { $push: { aplicants: idAplicant } })
            return result
        } catch (error) {
            console.log(error);
            return error
        }
    }
}

module.exports = Jobs   