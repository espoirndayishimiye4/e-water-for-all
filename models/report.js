const {Schema, default: mongoose} = require('mongoose')

const reportSchema = new Schema({
    agentId: {
        type: String,
        required: true
    },
    message: {
        type:String,
    },
    status:{
        type:Boolean,
        default: true
    }
})

const report = mongoose.model('report', reportSchema)

module.exports = report
