const {Schema, default: mongoose} = require('mongoose')

const tapSchema = new Schema({
    firstName: {
        type:String
    },
    lastName:{
        type:String
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    address: {
        type:String
    }
})

const user = mongoose.model('User', tapSchema)

module.exports = user
