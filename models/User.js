const { mongoose: { Schema, model } } = require('../config/db')

const userSchema = new Schema(
     {
          username: {
               type: String,
               unique: true,
          },
          email: {
               type: String,
               unique: true,
          },
          password: {
               type: String,
               unique: true,
          }
     },
     {
          timestamps: true,
          versionKey: false,
     }
)

module.exports = model('Users', userSchema)

