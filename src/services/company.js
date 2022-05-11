const companyModel = require('../models/Company')
const Users = require('./users')

class Company {

    constructor(){
        this.userServ = new Users()
    }

    async getAll() {
        try {
            const result = await companyModel.find()
            return result
        } catch (error) {
            return result
        }
    }

    async create(idModerator, data) {
        try {
            await this.userServ.updateRoles(idModerator)
            const newCompany = { idModerator, ...data }
            const result = await companyModel.create(newCompany)
            return result
        } catch (error) {
            return error
        }
    }
}

module.exports = Company