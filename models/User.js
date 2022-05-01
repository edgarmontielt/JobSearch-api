const { mongoose } = require('../config/db')

const userSchema = new mongoose.Schema(
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

module.exports = mongoose.model('Users', userSchema)

