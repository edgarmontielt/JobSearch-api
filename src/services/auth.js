const jwt = require("jsonwebtoken")
const { secret } = require("../config")

class Auth {
     async logIn(data) {
          const token = jwt.sign(data, secret)
          return token
     }
}

module.exports = Auth