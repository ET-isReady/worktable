import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Antdesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import { logo2, my_img } from '../CommonCss/pagecss'
import logo from '../assets/pp_logo.png'
import img from '../assets/profiledefault.jpg'
import { URI } from '../URI'


const TopNavbar = ({ navigation, page })=>{


const [userdata, setUserdata] = React.useState(null)
const loaddata = async () => {
  AsyncStorage.getItem('user')
      .then(async (value) => {
         //  fetch('http://10.0.2.2:3000/userdata', {
           fetch(`${URI}/userdata`, {
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


return (
 <View style={styles.container}>
 <TouchableOpacity onPress={()=>navigation.navigate('My_UserProfile')}>
  {
   userdata?.profilepic.length > 0 ?
   <Image style={styles.profilePic} source={{ uri: userdata.profilepic }} />
     :
     <Image source={img} style={my_img}/>


   }
  {/* <Image source={img} style={my_img}/>    */}
 </TouchableOpacity>


 <TouchableOpacity onPress={()=>navigation.navigate('MainPage')}>
 <Image source={logo} style={logo2}/>
 </TouchableOpacity>


 {
   page === 'MainPage' &&
   <Ionicons name="chatbubble-ellipses-outline" size={24} color="black"
     onPress={
       ()=>navigation.navigate('All_Chats')
 } />
}




 {
   page === 'My_UserProfile' &&
    <FontAwesome name="dashboard" size={24} color="#de813e"
     onPress={
       ()=>navigation.navigate('Settings')
 }


   />


 }
 </View>


)
}


export default TopNavbar


const styles = StyleSheet.create({
container: {
 flexDirection: 'row',
 justifyContent: 'space-between',
 alignItems: 'center',
 width: '100%',
 paddingVertical: 10,
 padding: 10,
 position: 'absolute',
 top: 0,
 zIndex: 100,
 borderColor: '#00FF7F',
 borderWidth: .5,
 borderBottomRightRadius: 5,
 borderBottomLeftRadius: 5,
 backgroundColor: '#fff',
 shadowColor: 'green',
 shadowOffset: {
   width: 0,
   height: 1
 },
 shadowOpacity: .2,
 shadowRadius: 2,
 elevation: 20
},
profilePic:{
  width: 30,
  height: 30,
  borderRadius: 44/2,
  borderColor: '#00FF7F',
  borderWidth: 1
}
})
