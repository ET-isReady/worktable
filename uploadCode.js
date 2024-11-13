const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


require('dotenv').config()


const nodemailer = require('nodemailer')


async function mailer(receiveremail, code) {
   //console.log("Mailer function called.")




   let transporter = nodemailer.createTransport({
       host: "smtp.gmail.com",
       port: 587,
       secure: false, // true for 465, false for other ports
       requireTLS: true,
       auth: {
           user: process.env.NodeMailer_email, // generated ethereal user
           pass: process.env.NodeMailer_password, // generated ethereal password
       },
   })




   let info = await transporter.sendMail({
       from: "Poetionpics",
       to: `${receiveremail}`,
       subject: "Poetionpics Email Verfication",
       text: `Greetings! Your Poetionpics Verification Code is ${code}`,
       html: `Greetings! Your Poetionpics Verification Code is <b>${code}</b>`
   })
   console.log("Message Sent: %s", info.messageId)
   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
}




router.post('/verify', (req, res) => {
   console.log('sent by client', req.body)
   const { email } = req.body




   if (!email) {
       return res.status(422).json({ error: "Please add all the fields" })
   }
   User.findOne({ email: email })
       .then(async (savedUser) => {
           if (savedUser) {
               return res.status(422).json({ error: "Invalid Credentials" })
           }
           try {
               let VerificationCode = Math.floor(100000 + Math.random() * 900000)
               await mailer(email, VerificationCode)
               console.log("Verification Code", VerificationCode)
               res.send({ message: "Verification Code Sent to your Email", VerificationCode, email })
           }
           catch (err) {
               console.log(err)
           }
       }
       )
})


router.post('/changeusername', (req, res)=>{
   const { username, email } = req.body


   User.find({ username }).then( async (savedUser) =>{
       if(savedUser.length > 0){
           return res.status(422).json({ error: "Username already exists"})
       } else{
           return res.status(200).json({ message: "Username Available!", username, email })
       }
   })
})


router.post('/signup', async (req, res)=>{
   const { username, email, password } = req.body


   if( !username || !email || !password ){
       return res.status(422).json({ error: "Please add all the fields" })
   }else{
       const user = new User({
           username,
           email,
           password
       })
       try{
           await user.save()
           const token = jwt.sign({ _id : user._id }, process.env.JWT_SECRET)
           return res.status(200).json({ message: "You Have Been Registered Successfully!", token })
       }
       catch(err){
           console.log(err)
           return res.status(422).json({ error: "User Not Registered"})
       }
   }
})


//forgot password
router.post('/verifyfp', (req, res) => {
   console.log('sent by client', req.body)
   const { email } = req.body


   if (!email) {
       return res.status(422).json({ error: "Please add all the fields" })
   }
   User.findOne({ email: email })
       .then(async (savedUser) => {
           if (savedUser) {
               try {
                   let VerificationCode = Math.floor(100000 + Math.random() * 900000)
                   await mailer(email, VerificationCode)
                   console.log("Verification Code", VerificationCode)
                   res.send({ message: "Verification Code Sent to your Email", VerificationCode, email })
               }
               catch (err) {
                   console.log(err)
               }
           } else{
               return res.status(422).json({ error: "Invalid Credentials" })
           }
       }
       )
})


router.post('/resetpassword', (req, res)=>{
   const { email, password } = req.body


   if( !email || !password ){
       return res.status(422).json({ error: "Please add all the fields"})
   } else{
       User.findOne({ email: email })
       .then( async (savedUser)=>{
           if(savedUser){
               savedUser.password = password
               savedUser.save()
               .then(user =>{
                   res.json({ message: "Password Changed Successfully!"})
               })
               .catch(err =>{
                   console.log(err)
               })
           }
           else{
               return res.status(422).json({ error: "Invalid Credentials"})
           }
       })
   }
})


router.post('/login', (req, res) =>{
   const { email, password } = req.body
   if(!email || !password){
     return res.status(422).json({ error: "Please add all the fields."})
   } else{
     User.findOne({ email: email})
     .then(savedUser =>{
       if(!savedUser){
         return res.status(422).json({ error: "Invalid Credentials. Please Try Again."})
       } else{
         console.log(savedUser)
         bcrypt.compare(password, savedUser.password)
         .then(
           doMatch => {
             if(doMatch){
               const token = jwt.sign({_id: savedUser._id}, process.env.JWT_SECRET)
 
 
               const {_id, username, email} = savedUser
 
 
               res.json({ message: "Successfully Signed In!", token, user:{_id, username, email}})
             } else{
               return res.status(422).json({ error: "Invalid Credentials"})
             }
           }
         )
         //res.status(200).json({ message: "User Logged In Successfully!", savedUser})
       }
     })
     .catch(err =>{
       console.log(err)
     })
   }
  })


module.exports = router