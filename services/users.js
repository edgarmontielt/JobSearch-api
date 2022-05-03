const UserModel = require('../models/User')
class Users {
     async getAll() {
          const users = await UserModel.find()
          return users
     }

     async create(data) {
          const newUser = await UserModel.create(data)
          return newUser
     }

     async update(id, data) {
          const newData = await UserModel.findByIdAndUpdate(id, data, { new: true })
          return newData
     }
}

module.exports = Users