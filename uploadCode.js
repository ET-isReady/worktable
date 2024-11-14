import { StyleSheet, Text, View, StatusBar, ScrollView, Image, ActivityIndicator, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect } from 'react'
import { c1, profilePic, txt, txt1, txt2, c11, c111, vl1, description, postPic, c13, txt3, c2 } from '../../CommonCss/pagecss'
import { formInput, searchFormHead, formTextLinkRight, formbtn, formTextLinkCenter } from '../../CommonCss/formcss'
import BottomNavbar from '../../components/BottomNavbar'
import TopNavbar from '../../components/TopNavbar'
import profiledefault from '../../../assets/profiledefault.jpg'
// import { useSelector } from 'react-redux'

const My_UserProfile = ({ navigation })=>{
  //below is for in case you want to use redux
//  const { user } = useSelector(( state: any ) => state.user)

const [userdata, setUserdata] = React.useState(null)

const loaddata = async () => {
    AsyncStorage.getItem('user')
        .then(async (value) => {
            fetch('http://10.0.2.2:3000/userdata', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + JSON.parse(value).token
                },
                body: JSON.stringify({ email: JSON.parse(value).user.email })
            })
                .then(res => res.json()).then(data => {
                    if (data.message == 'User Found') {
                        setUserdata(data.user)
                    }
                    else {
                        Alert.alert('Login Again')
                        navigation.navigate('Login')
                    }
                })
                .catch(err => {
                    navigation.navigate('Login')
                })
        })
        .catch(err => {
            navigation.navigate('Login')
        })
}
useEffect(() => {
    loaddata()
}, [])

 //  console.log('userdata ', userdata)

return (
  <View style={styles.container}>
  <StatusBar />
  <TopNavbar navigation = {navigation} page={"My_UserProfile"} />
  <BottomNavbar navigation = {navigation} page={"My_UserProfile"} />
  {/* <MaterialCommunityIcons name="cloud-refresh" size={50} color="green"
  style={styles.refresh} onPress={()=>loaddata()}
  /> */}
  {
    userdata ?
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={c1}>


    {
      userdata.profilepic.length > 0 ?
      <Image style={ profilePic } source={{ uri: userdata.profilepic }} />
      :
      <Image style={ profilePic } source={profiledefault} />

    }


      <Text style={txt}>{userdata?.username}</Text>
      <View style={c11}>
        <View>
          <Text style={txt1}>Followers</Text>
          <Text style={txt2}>{userdata?.followers.length}</Text>
        </View>
        <View style={vl1}></View>
        <View style={c111}>
          <Text style={txt1}>Following</Text>
          <Text style={txt2}>{userdata?.following.length}</Text>
        </View>
        <View style={vl1}></View>
        <View style={c111}>
          <Text style={txt1}>Posts</Text>
          <Text style={txt2}>{userdata?.posts.length}</Text>
        </View>
      </View>
      {
        userdata?.userheader.length > 0 &&
        <Text style={description}>{userdata?.userheader}</Text>
      }
    </View>
    {
      userdata.posts.length > 0 ?


      <View style={c1}>
      <Text style={txt}>Your Posts</Text>
      <View style={c13}>
      {
        userdata.posts?.map(
          (item)=>{
            return(
              <Image style={postPic} key={item.post}
              source={{ uri: item.post }} />
            )
          }
        )
      }
      </View>
      </View>
      :
      <View style={c2}>
      <Text style={txt3}>You have not created any posts yet.</Text>
      </View>
    }
    </ScrollView>
    :
    <ActivityIndicator size="large" color='#00FF7F' />
  }
  </View>
)
}


export default My_UserProfile


const styles = StyleSheet.create({
container: {
width: '100%',
height: '100%',
paddingVertical: 50
}
})