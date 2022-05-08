const cvModel = require('../models/CV')

class Curriculum {
    async create(data) {
        // console.log(data);
        const newCV = { idUser: "627185e97de7078b5e1f4bc2", ...data }
        const result = await cvModel.create(newCV)
        console.log(result);
        return result
    }

    async getCVandUser(id) {
        const cv = await cvModel.find({_id: id}).populate('idUser')
        return cv
    }
}

module.exports = Curriculum