const jwt = require("jsonwebtoken")
const { jwt_secret } = require("../config")
const UserModel = require('../models/User')

class Auth {
    getToken(user) {
        const data = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        const token = jwt.sign(data, jwt_secret, { expiresIn: '7d' })
        return { succcess: true, data, token }
    }

    async logIn(email, password) {
        if (!email || !password) return { success: false, message: "Ingresa credenciales" }
        const user = await this.validateEmail(email)
        if (user.exists) {
            const correctPassword = await UserModel.comparePassword(password, user.data.password)
            if (correctPassword) return this.getToken(user.data)
        }

        return { message: 'User not found', code: 400 }
    }

    async signUp(data) {
        try {
            const validate = await this.validateEmail(data.email)
            if (!validate.exists) {
                const newUser = new UserModel({
                    username: data.username,
                    email: data.email,
                    password: await UserModel.encryptPassword(data.password),
                });
                const results = await newUser.save()
                return this.getToken(newUser)
            }
            return { message: validate.message }
        } catch (error) {
            console.log(error);
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
}

module.exports = Auth