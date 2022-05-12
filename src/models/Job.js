const { mongoose: { Schema, model } } = require('../config/db')

const jobSchema = new Schema(
    {
        idCompany: {
            type: Schema.Types.ObjectId,
            ref: 'Company'
        },
        title: String,
        description: String,
        location: {
            state: String,
            country: String,
        },
        monthlySalary: String,
        requirements: {
            type: Array,
            default: []
        },
        jobOffer: {
            type: Array,
            default: []
        },
        aplicants: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Users'
            }
        ]
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

module.exports = model('Jobs', jobSchema)