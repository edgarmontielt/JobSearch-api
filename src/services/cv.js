const cvModel = require('../models/CV')

class Curriculum {
    async create(id, data) {
        const result = await this.validateCV(id)
        if (!result.cvExists) {
            const newCV = { idUser: id, ...data }
            const result = await cvModel.create(newCV)
            return result
        }
        return { message: 'There is already a CV assigned to your user', cvFound: result.userCV }
    }

    async getCVandUser(id) {
        const cv = await cvModel.find({ idUser: id }).populate('idUser')
        return cv
    }

    async validateCV(idUser) {
        const userCV = await cvModel.findOne({ idUser: idUser })
        if (userCV) return { cvExists: true, userCV }
        return false
    }
}

module.exports = Curriculum