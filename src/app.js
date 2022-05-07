const express = require('express')
const morgan = require('morgan')

// Routes import
const users = require('./routes/users.routes')
const auth = require('./routes/auth.routes')
const cv = require('./routes/cv.routes')

const app = express()

//Morgan
app.use(morgan('dev'))

// JSON Middleware
app.use(express.json())

users(app)
auth(app)
cv(app)

app.get('/', (req, res) => {
     res.json({ hello: 'World' })
})

module.exports = app
