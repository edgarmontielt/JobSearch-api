const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const pkg = require('../package.json')
const createRole = require('./libs/initialSetup')

// Routes import
const users = require('./routes/users.routes')
const auth = require('./routes/auth.routes')
const cv = require('./routes/cv.routes')
const jobs = require('./routes/jobs.routes')
const company = require('./routes/company.routes')

const app = express()
createRole()

app.set('pkg', pkg)

//Morgan
app.use(morgan('dev'))

// JSON Middleware
app.use(express.json())

//CORS
app.use(cors({
     credentials:true,
     origin: ['http://localhost:3000']
}))

// Routes
users(app)
auth(app)
cv(app)
jobs(app)
company(app)

app.get('/', (req, res) => {
     const projectData = {
          author: app.get('pkg').author,
          name: app.get('pkg').name,
          description: app.get('pkg').description,
          version: app.get('pkg').version,
     }
     return res.json(projectData)
})

module.exports = app
