const jwt = require("jsonwebtoken")
const { jwtSecret } = require("../config")
const UserModel = require('../models/User')
const UserService = require('../services/users')

class Auth {

    constructor() {
        this.userServ = new UserService()
    }

    #getToken(user) {
        const data = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        const token = jwt.sign(data, jwtSecret, { expiresIn: '7d' })
        return { 
            succcess: true,
            data,
            token 
        }
    }

    async logIn(email, password) {
        try {
            if (!email || !password) return { success: false, message: "Ingresa credenciales" }
            const user = await this.userServ.validateEmail(email)
            if (user.exists) {
                const correctPassword = await UserModel.comparePassword(
                    password,
                    user.data.password
                )
                if (correctPassword) return this.#getToken(user.data)

                return { 
                    message: 'Password incorrect', 
                    code: 400 
                }
            }
            return { 
                message: 'User not found', 
                code: 400 
            }
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async signUp(data) {
        console.log(data);
        try {
            const validate = await this.userServ.validateEmail(data.email)
            if (!validate.exists) {
                const result = await this.userServ.create(data)
                return this.#getToken(result)
            }
            return { 
                message: validate.message, 
                code:400
            }
        } catch (error) {
            console.log(error)
            return error
        }
    }
}

module.exports = Auth