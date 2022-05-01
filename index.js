const express = require('express')
const { port } = require('./config')
const { connection } = require('./config/db')

// Routes import
const  usersRouter = require('./routes/users.routes')

connection()

const app = express()

usersRouter(app)

app.get('/', (req, res) => {
     res.json({ hello: 'World' })
})

app.listen(port, () => {
     console.log(`Server in http://localhost:${port}`);
}) 