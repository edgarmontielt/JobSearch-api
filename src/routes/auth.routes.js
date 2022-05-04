const { Router } = require('express')
const AuthService = require('../services/auth')

function auth(app) {
     const router = Router()
     app.use('/api/auth', router)
     const authServ = new AuthService()

     router.post('/login', (req, res) => {
          const token = authServ.logIn(req.body)
          return res.send(token)
     })
}

module.exports = auth