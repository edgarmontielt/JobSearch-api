const Role = require("../models/Role");
const UserModel = require("../models/User");

class Users {
     async getAll() {
          try {
               const users = await UserModel.find().populate('role')
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
               const userFound = await UserModel.find({ email }).populate('role')
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
               const role = await Role.findOne({ name: 'user' })
               const newUser = new UserModel({
                    username: data.username,
                    email: data.email,
                    password: await UserModel.encryptPassword(data.password),
                    personalInformation: data.personalInformation,
                    role: [role._id]
               });
               const result = await newUser.save()
               return result
          } catch (error) {
               return error
          }
     }

     async update(id, data) {
          try {
               const newUser = {
                    username: data.username,
                    email: data.email,
                    password: await UserModel.encryptPassword(data.password),
                    personalInformation: data.personalInformation,
               }
               const newData = await UserModel.findByIdAndUpdate(id, newUser, { new: true })
               return newData
          } catch (error) {
               console.log(error)
          }
     }

     async updateRoles(idUser) {
          const role = await Role.findOne({ name: 'moderator' })
          const result = await UserModel.updateOne({ _id: idUser }, { $set: { role: [role]} })
          return result
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