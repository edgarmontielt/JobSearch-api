const jwt = require("jsonwebtoken")
const { jwt_secret } = require("../config")
const UserModel = require('../models/User')

class Auth {

     getToken(user) {
          const data = {
               id:user._id,
               username: user.username
          }

          const token = jwt.sign(data, jwt_secret, {expiresIn: '7d'})
          return { succcess: true, data, token }
     }

     async logIn(data) {
          const token = jwt.sign(data, jwt_secret)
          return token
     }

     async signUp(data) {
          try {
               const validate = await this.validateEmail(data.email)
               if (!validate.error) {
                    const newUser = new UserModel({
                         username: data.username,
                         email: data.email,
                         password: await UserModel.encryptPassword(data.password),
                    });
                    const results = await newUser.save()
                    return this.getToken(newUser)
               }
               return validate.message
          } catch (error) {
               console.log(error);
          }
     }

     async validateEmail(email) {
          try {
               const userFound = await UserModel.find({ email })
               if (userFound.length > 0) {
                    return { error: true, message: 'User already exists' }
               }
               return { error: false, message:'' }
          } catch (error) {
               console.log(error);
          }
     }
}

module.exports = Auth