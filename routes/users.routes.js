const express = require('express')
const UserService = require('../services/users')

function users(app) {
     const router = express.Router()
     const userServ = new UserService()

     app.use('/api/users', router)

     router.get('/', async (req, res) => {
          const users = await userServ.getAll()
          return res.json(users)
     })

     router.post('/', async (req, res) => {
          const user = await userServ.create(req.body)
          return res.json(user)
     })

     router.put('/:id', async (req, res) => {
          const newData = await userServ.update(req.params.id, req.body)
          return res.json(newData)
     })
     

}

module.exports = users