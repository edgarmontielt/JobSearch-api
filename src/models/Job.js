const { mongoose: { Schema, model } } = require('../config/db')

const jobSchema = new Schema({
    idCompany: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    },
    name: String,
    description: String,
    location: {
        state: String,
        country: String,
    },
    salary: String,
    requirements: {
        type: Array,
        default: []
    },
    offer: {
        type: Array,
        default: []
    }
})

module.exports = model('Jobs', jobSchema)