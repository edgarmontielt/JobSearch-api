const { Router } = require('express')
const AuthService = require('../services/auth')

function auth(app) {
     const router = Router()
     app.use('/api/auth', router)
     const authServ = new AuthService()

     router.post('/login', async (req, res) => {
          const { email, password } = req.body
          const result = await authServ.logIn(email, password)
          return res.status(200).json(result)
     })

     router.post('/signup', async (req, res) => {
          const { username, email, password } = req.body
          const user = await authServ.signUp({ username, email, password })
          return res.status(200).json(user)
     })
}

module.exports = auth