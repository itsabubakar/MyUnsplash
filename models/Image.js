const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('Image', imageSchema)