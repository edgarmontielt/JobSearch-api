const { mongoose: { Schema, model } } = require('../config/db')

const cvSchema = new Schema({
    professionalProfile: {
        title: String,
        description: String
    },
    studies: [
        {
            nameSchool: String,
            levelStudy: String,
        }
    ],
    languages: [
        { 
            idiom: String 
        }
    ],
    habilities:[
        {
            language: String
        }
    ]
})

module.exports = model('CV', cvSchema)