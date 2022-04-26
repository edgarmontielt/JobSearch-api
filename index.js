const express = require('express')
const { port } = require('./config')

const app = express()

app.get('/', (req, res) => {
     res.json({ hello: 'World' })
})

app.listen(port, () => {
     console.log(`Server in http://localhost:${port}`);
}) 