const {Schema, default: mongoose} = require('mongoose')

const messageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type:String,
        min:10
    },
    address:{
        type:String,
    },
    message:{
        type: String,
        required:true
    }
})

const message = mongoose.model('message', messageSchema)

module.exports = message
