const express = require('express')
const morgan = require('morgan')

// Routes import
const usersRouter = require('./routes/users.routes')
const authRouter = require('./routes/auth.routes')

const app = express()

//Morgan
app.use(morgan('dev'))

// JSON Middleware
app.use(express.json())

usersRouter(app)
authRouter(app)

app.get('/', (req, res) => {
     res.json({ hello: 'World' })
})

module.exports = app
