const {Schema, default: mongoose} = require('mongoose')

const messageSchema = new Schema({
    name: {
        type: String
        
    },
    phone: {
        type:String,
        
    },
    address:{
        type:String,
    },
    message:{
        type: String
    }
})

const message = mongoose.model('message', messageSchema)

module.exports = message
