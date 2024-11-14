import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import profiledefault from '../../assets/profiledefault.jpg'


const UsersCard = ({ user, navigation })=>{

return(
  //use code below for upper corner small profile image
  <TouchableOpacity onPress={()=>{
    navigation.navigate('Other_UserProfile', { user: user })
  }}>
    <View style={styles.ChatCard}>
  {
    user.profilepic
    ?
    <Image source={{ uri: user.profilepic }} style={styles.profile_image}/>
    :
    <Image source={ profiledefault } style={styles.profile_image}/>
  }


  <View style={styles.c1}>
  <Text style={styles.username}>{user.username}</Text>
  </View>
  </View>
  </TouchableOpacity>
)
}

export default UsersCard

const styles = StyleSheet.create({
ChatCard: {
  width: '100%',
  height: 75,
  backgroundColor: 'white',
  borderRadius: 10,
  marginVertical: 10,
  flexDirection: 'row',
  marginTop: 10,
  padding: 10,
},
profile_image: {
  width: 50,
  height: 50,
  borderRadius: 50,
  borderColor: 'red',
  borderWidth: 1
},
c1: {
  marginLeft: 10
},
username: {
  color: 'black',
  fontSize: 20
}
})



   