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

     async validateEmail(email) {
          try {
               const userFound = await UserModel.find({ email })
               if (userFound.length > 0) {
                   return { exists: true, message: 'User already exists', data: userFound[0] }
               }
               return { exists: false, message: '', user: userFound }
           } catch (error) {
               console.log(error);
           }
     }

     async create(data) {
          try {
               const newUser = new UserModel({
                    username: data.username,
                    email: data.email,
                    password: await UserModel.encryptPassword(data.password),
                    personalInformation: data.personalInformation
               });
               const result = await newUser.save()
               return result
          } catch (error) {
               console.log(error);
               return error
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