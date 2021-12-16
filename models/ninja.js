const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create ninja schema and model!
const NinjaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rank: {
        type: String
    },
    available: {
        type: Boolean,
        default: false
    },
    photo: {
        type: String
    }
},
{
    timestamps: true
})

const Ninja = mongoose.model('ninja',NinjaSchema);

module.exports = Ninja;