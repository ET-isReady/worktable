router.post('/update-pic', async (req, res)=>{
    const { email, profilepic } = req.body
    try{
      await User.updateOne({ email: email }, {
          $set:{
              profilepic
          }
      })
      res.send({ status: 'Ok', data: 'updated'})
   }catch(err){
      return res.send({ error: error})
   }
   })