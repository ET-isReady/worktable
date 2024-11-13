//get user data
router.post('/userdata', (req, res) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({ error: "You must be logged in, token not given" })
    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "You must be logged in, token invalid" })
        }
        const { _id } = payload
        User.findById(_id).then(userdata => {
            res.status(200).send({
                message: "User Found",
                user: userdata
            });
        })
    })
 })
 
 
 // get other user
 router.post('/otheruserdata', (req, res) => {
  const { email } = req.body;
  User.findOne({ email: email })
      .then(saveduser => {
          if (!saveduser) {
              return res.status(422).json({ error: "Invalid Credentials" });
          }
          //    console.log(saveduser);
          let data = {
              _id: saveduser._id,
              username: saveduser.username,
              email: saveduser.email,
              userheader: saveduser.userheader,
              profilepic: saveduser.profilepic,
              followers: saveduser.followers,
              following: saveduser.following,
              posts: saveduser.posts
          }
          // console.log(data);
          res.status(200).send({
              user: data,
              message: "User Found"
          })
      })
 })
 
 
 router.post('/setusername', (req, res)=>{
    const { username, email } = req.body
    if( !username || !email ){
      return res.status(422).json({ erro: "Please add all the fields"})
    }
    User.find({ username }).then( async (savedUser)=>{
      if( savedUser.length > 0 ){
        return res.status(422).json({ error: "Username already exists"})
      } else{
        User.findOne({ email: email})
        .then( async savedUser => {
          if( savedUser ){
            savedUser.username = username
            savedUser.save()
            .then( user =>{
              res.json({ message: "Username Updated!"})
            })
            .catch( err =>{
              return res.status(422).json({ error: "Server Error"})
            })
          } else{
            return res.status(422).json({ error: "Invalid Credentials"})
          }
        })
      }
    })
   })
  
 router.post('/setuserheader', (req, res)=>{
    const { userheader, email } = req.body
    if( !userheader || !email ){
      return res.status(422).json({ error: "Please add all the fields"})
    }
    User.findOne({ email: email })
    .then( async savedUser =>{
      if(savedUser){
        savedUser.userheader = userheader
        savedUser.save()
        .then(user=>{
          res.json({ message: "Profile Header Updated!"})
        })
        .catch( err=>{
          return res.status(422).json({ error: "Server Error"})
        })
      } else{
        return res.status(422).json({ error:" Invalid Credentials"})
      }
    })
    .catch( err =>{
      return res.status(422).json({ error:"Server Error"})
    })
   })
  
   //change password
 router.post('/changepassword', (req, res)=>{
    const { oldPassword, newPassword, email } = req.body
  
  
    if( !oldPassword || !newPassword || !email ){
      return res.status(422).json({ error: "Please add all the fields."})
    } else{
      User.findOne({ email:email })
      .then( async savedUser=>{
        if(savedUser){
          bcrypt.compare( oldPassword, savedUser.password )
            .then( doMatch=>{
              if( doMatch ){
                savedUser.password = newPassword
                savedUser.save()
                .then(user=>{
                  res.json({ message: "Password Changed Successfully!"})
                })
                .catch(err=>{
                  // console.log(err)
                  return res.status(422).json({ error: "Server Error"})
                })
              }
              else{
                return res.status(422).json({ error: "Invalid Credentials"})
              }
            })
        }
        else{
          return res.status(422).json({ error: "Invalid Credentials"})
        }
      })
    }
   })
  
 // check follow
 router.post('/checkfollow', (req, res)=>{
  const { followfrom, followto } = req.body
  // followfrom = my email
  // followto = other user email
  console.log( followfrom, followto )
  if(!followfrom || !followto){
    return res.status(422).json({ error: 'Invalid Credentials'})
  }
  User.findOne({ email : followfrom })
  .then( mainuser =>{
    if(!mainuser){
      return res.status(422).json({ error: 'Invalid Credentials'})
    } else{
      let data = mainuser.following.includes(followto)
     // console.log(data)
      if( data == true ){
        res.status(200).send({
          message: "User is a fan"
        })
      } else{
        res.status(200).send({
          message: "User is not a fan"
        })
      }
    }
  })
  .catch( err => {
    return res.status(422).json({ error: "Server Error"})
  })
 })
 // follow user
 router.post('/followuser', async (req, res)=>{
  const { followfrom, followto } = req.body
  // followfrom = my email
  // followto = other user email
  if( !followfrom || !followto ){
    return res.status(422).json({ error: "Invalid Credentials" })
  }
  User.findOne({ email : followfrom })
  .then(mainuser => {
    if( !mainuser ){
      return res.status(422).json({ error: "Invalid Credentials" })
    } else{
      if( mainuser.following.includes(followto) ){
        return res.status(422).json({ error: "Already Following"})
      } else{
        mainuser.following.push(followto)
        mainuser.save()
      }
  User.findOne({ email : followto })
  .then(otheruser => {
    if( !otheruser ){
      return res.status(422).json({ error: "Invalid Credentials" })
    } else{
      if( otheruser.followers.includes(followfrom) ){
        return res.status(422).json({ error: "Already Following"})
      } else{
                Notification.create({
                  creator: followfrom,
                  type: "Follow",
                  title: " Is now a Fan of yours!",
                  userId: followto,
                });
        otheruser.followers.push(followfrom)
        otheruser.save()
      }
      res.status(200).send({
        message: "User Followed"
      })
    }
  })
    }
  })
 })
 
 
 // unfollow user
 router.post('/unfollowuser', (req, res) => {
  const { followfrom, followto } = req.body
  // console.log(followfrom, followto)
  if (!followfrom || !followto) {
      return res.status(422).json({ error: "Invalid Credentials" })
  }
  User.findOne({ email: followfrom })
      .then(mainuser => {
          if (!mainuser) {
              return res.status(422).json({ error: "Invalid Credentials" })
          }
          else {
              if (mainuser.following.includes(followto)) {
                  mainuser.following.pull(followto)
                  mainuser.save()
                  User.findOne({ email: followto })
                      .then(otheruser => {
                          if (!otheruser) {
                              return res.status(422).json({ error: "Invalid Credentials" })
                          }
                          else {
                              if (otheruser.followers.includes(followfrom)) {
                                  otheruser.followers.pull(followfrom)
                                  otheruser.save()
                                  return res.status(200).json({ message: "User Unfollowed"})
                              } else{
                                return res.status(422).json({ error: "Not Following"})
                              }
                          }
                      })
              } else{
                return res.status(422).json({ error: "Not Following"})
              }
          }
      })
 })
 
 
 //Search for user
 router.post('/searchuser', (req, res) => {
  const { keyword } = req.body;
  if (!keyword) {
      return res.status(422).json({ error: "Please search a username" });
  }
  User.find({ username: { $regex: keyword, $options: 'i' } })
      .then(user => {
          // console.log(user);
          let data = [];
          user.map(item => {
              data.push(
                  {
                      _id: item._id,
                      username: item.username,
                      userheader: item.userheader,
                      followers: item.followers,
                      email: item.email,
                      userdesc: item.userdesc,
                      profilepic: item.profilepic
                  }
              )
          })
          // console.log(data);
          if (data.length == 0) {
              return res.status(422).json({ error: "No User Found" });
          }
          res.status(200).send({ message: "User Found", user: data });
      })
      .catch(err => {
          res.status(422).json({ error: "Please search a username" });
      })
 })
 //get user by id
 router.post('/getuserbyid', (req, res) => {
  const { userid } = req.body
  User.findById({ _id: userid })
      .then(saveduser => {
          if (!saveduser) {
              return res.status(422).json({ error: "Invalid Credentials" })
          }
          //    console.log(saveduser);
          let data = {
              _id: saveduser._id,
              username: saveduser.username,
              email: saveduser.email,
              description: saveduser.description,
              profilepic: saveduser.profilepic,
              followers: saveduser.followers,
              following: saveduser.following,
              posts: saveduser.posts
          }
 
 
          // console.log(data);
 
 
          res.status(200).send({
              user: data,
              message: "User Found"
          })
      })
      .catch(
          err => {
              console.log('error in getuserbyid ')
          }
      )
 })
 // check follow
 router.post('/checkfollow', (req, res)=>{
  const { followfrom, followto } = req.body
  // followfrom = my email
  // followto = other user email
  console.log( followfrom, followto )
  if(!followfrom || !followto){
    return res.status(422).json({ error: 'Invalid Credentials'})
  }
  User.findOne({ email : followfrom })
  .then( mainuser =>{
    if(!mainuser){
      return res.status(422).json({ error: 'Invalid Credentials'})
    } else{
      let data = mainuser.following.includes(followto)
     // console.log(data)
      if( data == true ){
        res.status(200).send({
          message: "User is a fan"
        })
      } else{
        res.status(200).send({
          message: "User is not a fan"
        })
      }
    }
  })
  .catch( err => {
    return res.status(422).json({ error: "Server Error"})
  })
 })
 // follow user
 router.post('/followuser', (req, res)=>{
  const { followfrom, followto } = req.body
  // followfrom = my email
  // followto = other user email
  if( !followfrom || !followto ){
    return res.status(422).json({ error: "Invalid Credentials" })
  }
  User.findOne({ email : followfrom })
  .then(mainuser => {
    if( !mainuser ){
      return res.status(422).json({ error: "Invalid Credentials" })
    } else{
      if( mainuser.following.includes(followto) ){
        return res.status(422).json({ error: "Already Following"})
      } else{
        mainuser.following.push(followto)
        mainuser.save()
      }
  User.findOne({ email : followto })
  .then(otheruser => {
    if( !otheruser ){
      return res.status(422).json({ error: "Invalid Credentials" })
    } else{
      if( otheruser.followers.includes(followfrom) ){
        return res.status(422).json({ error: "Already Following"})
      } else{
        otheruser.followers.push(followfrom)
        otheruser.save()
      }
      res.status(200).send({
        message: "User Followed"
      })
    }
  })
    }
  })
 })
 // unfollow user
 router.post('/unfollowuser', (req, res) => {
  const { followfrom, followto } = req.body
  console.log(followfrom, followto)
  if (!followfrom || !followto) {
      return res.status(422).json({ error: "Invalid Credentials" })
  }
  User.findOne({ email: followfrom })
      .then(mainuser => {
          if (!mainuser) {
              return res.status(422).json({ error: "Invalid Credentials" })
          }
          else {
              if (mainuser.following.includes(followto)) {
                  mainuser.following.pull(followto)
                  mainuser.save()
                  User.findOne({ email: followto })
                      .then(otheruser => {
                          if (!otheruser) {
                              return res.status(422).json({ error: "Invalid Credentials" })
                          }
                          else {
                              if (otheruser.followers.includes(followfrom)) {
                                  otheruser.followers.pull(followfrom)
                                  otheruser.save()
                                  return res.status(200).json({ message: "User Unfollowed"})
                              } else{
                                return res.status(422).json({ error: "Not Following"})
                              }
                          }
                      })
              } else{
                return res.status(422).json({ error: "Not Following"})
              }
          }
      })
 }) 