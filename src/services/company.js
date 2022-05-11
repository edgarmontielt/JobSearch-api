const companyModel = require('../models/Company')
const Jobs = require('./jobs')
const Users = require('./users')

class Company {

    constructor() {
        this.userServ = new Users()
        this.jobServ = new Jobs()
    }

    async getAll() {
        try {
            const result = await companyModel.find().populate('jobs')
            return result
        } catch (error) {
            return result
        }
    }

    async getOne(id) {
        try {
            const result = await companyModel.findOne({ _id: id })
            return result
        } catch (error) {
            return error
        }
    }

    async create(idModerator, data) {
        try {
            await this.userServ.updateRoles(idModerator)
            const result = await companyModel.create({ idModerator, ...data })
            return result
        } catch (error) {
            return error
        }
    }

    async addJob(idComapny, data) {
        try {
            const job = await this.jobServ.create({ idCompany: idComapny, ...data })
            const result = await companyModel.updateOne(
                { _id: idComapny },
                { $push: { jobs: job.id } }
            )
            return {
                message: 'Job created successfull',
                job,
                result
            }
        } catch (error) {
            return error
        }
    }

    async deleteJob(idCompany, idJob) {
        try {
            const job = await this.jobServ.delete(idJob)
            const result = await companyModel.updateOne(
                { _id: idCompany },
                { $pull: { jobs: job.id } }
            )
            return {
                message: 'Job deleted successfull',
                job,
                result
            }
        } catch (error) {
            return error
        }
    }
}

module.exports = Company