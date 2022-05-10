const { mongoose: { Schema, model } } = require('../config/db')

const companySchema = new Schema(
    {
        idModerator: {
            ref: 'Users',
            type: Schema.Types.ObjectId
        },
        name: {
            type: String,
            unique: true
        },
        email: {
            type: email,
            unique: true
        },
        jobs: [
            {
                ref: 'Jobs',
                type: Schema.Types.ObjectId
            }
        ]
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

module.exports = model('Company', companySchema)