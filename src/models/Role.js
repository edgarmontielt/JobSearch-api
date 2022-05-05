const { mongoose: { Schema, model } } = require('../config/db')

const roleSchema = new Schema({
     name:{
          type: String,
          unique: true
     }
})

module.exports = model('Role', roleSchema)