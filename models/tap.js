const {Schema, default: mongoose} = require('mongoose')
//mongoose.Promise = global.Promise;

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

const tap = mongoose.model('Tap', tapSchema)
module.exports = tap;
