const express = require('express')
const { verifyToken, isAdmin } = require('../middleware')
const UserService = require('../services/users')

function users(app) {
     const router = express.Router()
     const userServ = new UserService()

     app.use('/api/users', router)

     router.get('/', [verifyToken, isAdmin], async (req, res) => {
          const users = await userServ.getAll()
          return res
               .status(200)
               .json(users)
     })

     router.get('/:id', verifyToken, async (req, res) => {
          const user = await userServ.getOne(req.params.id)
          return res
               .status(200)
               .json(user)
     })

     router.put('/:id', verifyToken,  async (req, res) => {
          const newData = await userServ.update(req.params.id, req.body)
          return res
               .status(200)
               .json(newData)
     })

     router.delete('/:id', [verifyToken, isAdmin], async (req, res) => {
          const result = await userServ.delete(req.params.id)
          return res
               .status(200)
               .json({ message: "User eliminated", result })
     })

     router.post('/updateRole/:id', async(req, res) => {
          const result = await userServ.updateRoles(req.params.id)
          return res.json(result)
     })
}

module.exports = users