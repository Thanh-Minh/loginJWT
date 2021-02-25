const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            max:200,
        },
        email:{
            type:String,
            required: true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
            min:6
        }
    },{timestamp:true}
)



module.exports = mongoose.model('User', userSchema)
