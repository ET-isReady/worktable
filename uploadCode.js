import { StyleSheet, Text, View, StatusBar, ScrollView, Image, ActivityIndicator, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect } from 'react'
import BottomNavbar from '../../components/BottomNavbar'
import TopNavbar from '../../components/TopNavbar'
import profiledefault from '../../../assets/profiledefault.jpg'
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// import { useDispatch, useSelector } from 'react-redux'
// import { MaterialCommunityIcons } from '@expo/vector-icons'


const Other_UserProfile = ({ navigation, route }) => {
 // const { user } = useSelector((state: any) => state.user)
const { user } = route.params
const [ userdata, setUserdata ] = React.useState(null)
 const loaddata = async () => {
    fetch('http://10.0.2.2:3000/otheruserdata', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: user.email })
    })
    .then( res=> res.json())
    .then(data => {
      if(data.message == 'User Found'){
          setUserdata(data.user)
          isMyProfile(data.user)
          CheckFollow(data.user)
      } else{
          Alert.alert('User Not Found')
          navigation.navigate('SearchUserPage')
      }
    })
    .catch(err =>{
      Alert.alert('Something Went Wrong')
      // navigation.navigate('SearchUserPage')
    })
}
useEffect(() => {
    loaddata()
}, [])

 // check my profile or other profile
  const [issameuser, setIssameuser] = useState(false)

  const isMyProfile = async (otherprofile)=>{
      AsyncStorage.getItem('user').then((loggeduser)=>{
          const loggedUserObj = JSON.parse(loggeduser)
          if(loggedUserObj.user.email == otherprofile.email){
              setIssameuser(true)
              console.log('same user')
          } else{
              setIssameuser(false)
              console.log('other user')
          }
      })
  }

// check follow or not
  const [isfollowing, setIsFollowing] = useState(false)

  const CheckFollow = async (otheruser)=>{
     const loggeduser = await AsyncStorage.getItem('user')
     const loggedUserObj = JSON.parse(loggeduser)


    fetch('http:/10.0.2.2:3000/checkfollow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        followfrom : loggedUserObj.user.email,
        followto : otheruser.email
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data.message == 'User is a fan'){
        setIsFollowing(true)
      } else if(
        data.message = 'User is not a fan'
      )
      {
        setIsFollowing(false)
      } else{
        Alert.alert('Something went wrong')
      }
    })

  }

//    // follow this user
  const FollowThisUser = async (otheruser) => {
 
    const loggeduser = await AsyncStorage.getItem('user')
    const loggedUserObj = JSON.parse(loggeduser)
  
    fetch('http://10.0.2.2:3000/followuser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            followfrom : loggedUserObj.user.email,
            followto : otheruser.email
        })
    })
    .then(res => res.json())
        .then(data => {
            if (data.message == 'User Followed') {
                // alert('Followed')
                setIsFollowing(true)
                loaddata()
            }
            else {
                Alert.alert('Something Went Wrong')
            }
        })
}

//    // unfollow this user
  const UnfollowThisUser = async (otheruser) => {

    const loggeduser = await AsyncStorage.getItem('user')
    const loggedUserObj = JSON.parse(loggeduser)

    fetch('http://10.0.2.2:3000/unfollowuser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            followfrom : loggedUserObj.user.email,
            followto : otheruser.email
        })
    })
    .then(res => res.json())
        .then(data => {
            if (data.message == 'User Unfollowed') {
                // alert('Followed')
                setIsFollowing(false)
                loaddata()
            }
            else {
                Alert.alert('Something Went Wrong')
            }
        })
}


return (
  <View style={styles.container}>
  <StatusBar />
  <TopNavbar navigation = {navigation} page={"Other_UserProfile"} />
  <BottomNavbar navigation = {navigation} page={"SearchUserPage"} />
  {/* <MaterialCommunityIcons name="cloud-refresh" size={50} color="green"
  style={styles.refresh} onPress={()=>loaddata()}
  /> */}
  {
    userdata ?
    <ScrollView>
    <View style={styles.c1}>
    {
      userdata.profilepic.length > 0 ?
      <Image style={styles.profilePic} source={{ uri: userdata.profilepic }} />
      :
      <Image style={styles.profilePic} source={profiledefault} />

    }
    <Text style={styles.txt}>{userdata.username}</Text>
      {
          !issameuser && <View style={styles.row}>
        
           {
                isfollowing ?
                  <Text style={styles.follow} onPress={() => UnfollowThisUser(userdata)}>You're A Fan!</Text>
                :
                  <Text style={styles.follow} onPress={() => FollowThisUser(userdata)}>Become A Fan</Text>
           }
          <Text style={styles.message}
          onPress={
                ()=>{ navigation.navigate('MessagePage',{
                       fuseremail : userdata.email,
                       fuserid : userdata._id,
                   })
                  }
               }>Message</Text>
      </View>
      }
      <View style={styles.c11}>
        <View>
          <Text style={styles.txt1}>Followers</Text>
          <Text style={styles.txt2}>{userdata.followers.length}</Text>
        </View>
        <View style={styles.vl1}></View>
        <View style={styles.c111}>
          <Text style={styles.txt1}>Following</Text>
          <Text style={styles.txt2}>{userdata.following.length}</Text>
        </View>
        <View style={styles.vl1}></View>
        <View style={styles.c111}>
          <Text style={styles.txt1}>Posts</Text>
          <Text style={styles.txt2}>{userdata.posts.length}</Text>
        </View>
      </View>
      {
        userdata.userheader.length > 0 &&
        <Text style={styles.description}>{userdata.userheader}</Text>
      }
    </View>
    {
        isfollowing || issameuser ?
          <View>
            {
              userdata.posts.length > 0 ?
                <View style={styles.c1}>
                  <Text style={styles.txt}>Posts</Text>
                    <View style={styles.c13}>
            {
              userdata.posts?.map((item) => {
                return (
                    <Image key={item.post} style={styles.postPic} source={{ uri: item.post }}/>
                       )
              })
            }
              </View>
          </View>
            :
          <View style={styles.c2}>
          <Text style={styles.txt1}>This user has not posted anything yet</Text>
          </View>
           }
           </View>




          :
           <View style={styles.c2}>
             <Text style={styles.txt1}>Follow to see posts</Text>
           </View>
          }
    </ScrollView>

    :

    <ActivityIndicator size="large" color='#00FF7F' />

  }
  </View>
)
}

export default Other_UserProfile

const styles = StyleSheet.create({
container: {
width: '100%',
height: '100%',
paddingVertical: 50
},
c1: {
  width: '100%',
  alignItems: 'center'
},
profilePic: {
  width: 150,
  height: 150,
  borderRadius: 400/2,
  borderRadius: 400/2,
  borderColor: '#00FF7F',
  borderWidth: 1,
  margin: 20
},
txt: {
  color: 'black',
  //backgroundColor: 'green',
  fontSize: 20,
  fontWeight: 'bold',
  marginTop: -15,
  marginBottom: 10,
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 20
},
txt1: {
  color: 'green',
  fontSize: 15,
},
txt2: {
  color: 'green',
  fontSize: 20
},
c11: {
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-around'
},
c111: {
  alignItems: 'center'
},
vl1: {
  width: 1,
  height: 50,
  backgroundColor: 'black'
},
description: {
  fontSize: 15,
  marginVertical: 10,
  width: '100%',
  padding: 10,
  paddingVertical: 20
},
postPic: {
  width: '32%',
  height: 120,
  margin: 1
},
c13: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginBottom: 20,
  justifyContent: 'center'
},
txt3: {
  color: 'black',
  //backgroundColor: 'green',
  fontSize: 20
},
c2: {
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  height: 200
},
refresh: {
  position: 'absolute',
  zIndex: 100,
  top: 195,
  right: 110
},
follow: {
  color: 'white',
  fontSize: 20,
  fontWeight: 'bold',
  margin: 10,
  backgroundColor: '#9540E4',
  paddingVertical: 10,
  paddingHorizontal: 30,
  borderRadius: 20
},
message: {
  color: 'white',
  fontSize: 20,
  fontWeight: 'bold',
  margin: 10,
  backgroundColor: '#9540E4',
  paddingVertical: 10,
  paddingHorizontal: 30,
  borderRadius: 20
},
row: {
  flexDirection: 'row'
}
})