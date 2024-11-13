const mongoose = require('mongoose')
require('dotenv').config()


mongoose.connect(process.env.mongo_URL).then(
   ()=>{
       console.log('We ready to roll, nigga!')
   }
).catch((err)=>{
   console.log('You done fucked up, here is why ' + err)
})
