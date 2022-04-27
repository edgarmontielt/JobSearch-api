const express = require('express')
const { port } = require('./config')
const { connection } = require('./config/db')

connection()

const app = express()

app.get('/', (req, res) => {
     res.json({ hello: 'World' })
})

app.listen(port, () => {
     console.log(`Server in http://localhost:${port}`);
}) 