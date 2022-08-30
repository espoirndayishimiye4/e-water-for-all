const {Schema, default: mongoose} = require('mongoose')

const tapSchema = new Schema({
    agentId: {
        type: String,
        required: true
    },
    name: {
        type:String,
    },
    status:{
        type:Boolean,
        default: true
    },
    address: {
        type:String
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const tap = mongoose.model('tap', tapSchema)

module.exports = tap
