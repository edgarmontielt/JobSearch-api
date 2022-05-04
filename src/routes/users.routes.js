const express = require('express')
const UserService = require('../services/users')

function users(app) {
     const router = express.Router()
     const userServ = new UserService()

     app.use('/api/users', router)

     router.get('/', async (req, res) => {
          const users = await userServ.getAll()
          return res.status(200).json(users)
     })

     router.get('/:id', async (req, res) => {
          const user = await userServ.getOne(req.params.id)
          return res.status(200).json(user)
     })

     router.post('/', async (req, res) => {
          const { username, email, password } = req.body
          const user = await userServ.create({ username, email, password })
          return res.status(200).json(user)
     })

     router.put('/:id', async (req, res) => {
          const newData = await userServ.update(req.params.id, req.body)
          return res.status(200).json(newData)
     })

     router.delete('/:id', async (req, res) => {
          const result = await userServ.delete(req.params.id)
          return res.status(200).json({ message: "User eliminated", result })
     })
}

module.exports = users