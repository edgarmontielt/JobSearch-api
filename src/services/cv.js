const cvModel = require('../models/CV')

class Curriculum {
    async getCVandUser(id) {
        try {
            const cv = await cvModel.find({ idUser: id }).populate('idUser')
            return cv
        } catch (error) {
            return error
        }
    }

    async create(id, data) {
        try {
            const result = await this.validateCV(id)
            if (!result.cvExists) {
                const newCV = { idUser: id, ...data }
                const result = await cvModel.create(newCV)
                return result
            }
            return {
                message: 'There is already a CV assigned to your user',
                cvFound: result.userCV
            }
        } catch (error) {
            return error
        }
    }

    async update(id, data) {
        try {
            const result = await cvModel.findByIdAndUpdate(id, data, { new: true })
            return result
        } catch (error) {

        }
    }

    async updateSkills(idCv, data) {
        try {
            let newSkills = []
            const { habilities } = await cvModel.findOne({ id: idCv })
            newSkills = [...habilities, data.new]
            const result = await cvModel.updateOne({ id: idCv }, { $set: { habilities: newSkills } })
            return { message: 'Habilities modify', newSkills }
        } catch (error) {
            return error
        }
    }

    async validateCV(idUser) {
        try {
            const userCV = await cvModel.findOne({ idUser: idUser })
            if (userCV) return { cvExists: true, userCV }
            return false
        } catch (error) {
            return error
        }
    }
}

module.exports = Curriculum