const express = require('express')

function users(app) {
     const router = express.Router()

     app.use('/api/users', router)

     router.get('/', (req, res) => {
          return res.json({ hello: 'World' })
     })

}

module.exports = users