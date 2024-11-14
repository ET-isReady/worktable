import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { formHead2, formHead3 } from '../../CommonCss/formcss'

const Settings = ({ navigation })=>{
const logout = ()=>{
  AsyncStorage.removeItem('user').then(()=>{
    navigation.navigate('Login')
  })


}
return(
  <View style={styles.container}>
  <Ionicons name="arrow-undo-circle" size={40} color="black"
  onPress={
    ()=>navigation.navigate('My_UserProfile')
  }
  />
    <Text style={formHead2}>Settings</Text>
    <Text style={styles.txt1} onPress={()=>navigation.navigate('EditProfile')}>Edit Profile</Text>
    <Text style={styles.txt1} onPress={()=>navigation.navigate('ChangePassword')}
    >Change Password</Text>
    <Text style={styles.txt1}>Customer Support</Text>
    <Text style={styles.txt2} onPress={
      ()=>logout()
    }>Logout</Text>
  </View>
)
}

export default Settings

const styles = StyleSheet.create({
container: {
  width: '100%',
  height: '100%'
},
txt1: {
  marginTop: 20,
  color: 'black',
  fontSize: 20,
  borderBottomColor: 'grey',
  borderBottomWidth: 1
},
txt2: {
 marginTop: 20,
 color: 'red',
 fontSize: 20,
 borderBottomColor: 'grey',
 borderBottomWidth: 1
}
})