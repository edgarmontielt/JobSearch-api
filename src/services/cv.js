const cvModel = require('../models/CV')

class Curriculum {
    async create(id, data) {
        const cvExists = await this.validateCV(id)
        if (!cvExists) {
            const newCV = { idUser: id, ...data }
            const result = await cvModel.create(newCV)
            return result
        }
        return { message: 'There is already a CV assigned to your user' }
    }

    async getCVandUser(id) {
        const cv = await cvModel.find({ idUser: id }).populate('idUser')
        return cv
    }

    async validateCV(idUser) {
        const userCV = cvModel.find({ idUser: idUser })
        if (userCV) return true
        return false
    }
}

module.exports = Curriculum