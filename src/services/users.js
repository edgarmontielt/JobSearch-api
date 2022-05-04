const UserModel = require("../models/User");

class Users {
     async getAll() {
          try {
               const users = await UserModel.find()
               return users
          } catch (error) {
               console.log(error)
          }
     }

     async getOne(id) {
          try {
               const user = await UserModel.findById(id)
               return user
          } catch (error) {
               console.log(error)
          }
     }

     async update(id, data) {
          try {
               const newData = await UserModel.findByIdAndUpdate(id, data, { new: true })
               return newData
          } catch (error) {
               console.log(error)
          }
     }

     async delete(id) {
          try {
               const result = await UserModel.findByIdAndDelete(id)
               return result
          } catch (error) {
               console.log(error)
          }
     }
}

module.exports = Users
