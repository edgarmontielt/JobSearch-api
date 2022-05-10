const { mongoose: { Schema, model } } = require('../config/db')

const cvSchema = new Schema(
    {
        idUser: {
            ref: 'Users',
            type: Schema.Types.ObjectId
        },
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
        languages: {
            type: Array,
            default: []
        },
        habilities: {
            type: Array,
            default: []
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

module.exports = model('CV', cvSchema)