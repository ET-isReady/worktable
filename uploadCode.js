const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
   username: {
       type: String,
       require: true
   },
   email: {
       type: String,
       required: true,
       unique: true
   },
   password: {
       type: String,
       required: true
   },
   profilepic: {
       type: String,
       default: ''
   },
   userheader: {
       type: String,
       default: ''
     },
   posts: {
       type: Array,
       default: []
   },
   followers: {
       type: Array,
       default: []
   },
   following: {
       type: Array,
       default: []
   },
   userdesc: {
       type: String,
       default: ''
   }
   })
       { timestamps: true }




userSchema.pre('save', async function(next){
   const user = this
   // console.log("Hashing just before saving ", user.password )
   if(!user.isModified('password')){
       return next()
   }
   user.password = await bcrypt.hash(user.password, 8)
   console.log("Hashing password just before saving ", user.password)
})




module.exports = mongoose.model("User", userSchema);