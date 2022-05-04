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

     router.post('/signup', async (req, res) => {
          const { username, email, password } = req.body
          const user = await authServ.signUp({ username, email, password })
          return res.status(200).json({ message: user })
     })
}

module.exports = auth