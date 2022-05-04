const app = require('./app')
const { port } = require('./config')
const { connection } = require('./config/db')

connection()

app.listen(port, () => {
     console.log(`Server in http://localhost:${port}`);
}) 