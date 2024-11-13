import { StyleSheet, Text, View, StatusBar, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect } from 'react'

import BottomNavbar from '../../components/BottomNavbar'
import TopNavbar from '../../components/TopNavbar'
import FollowersRandomPost from '../../components/FollowersRandomPost'
import AntDesign from 'react-native-vector-icons/AntDesign'

const MainPage = ({ navigation })=>{


const [ userdata, setUserdata ] = useState(null)


useEffect(()=>{
  AsyncStorage.getItem('user')
  .then(data => {
    setUserdata(JSON.parse(data))
  })
  .catch(err => Alert.alert(err))


}, [])
console.log('userdata ', userdata)

return (
  <View style={styles.container}>
  <StatusBar />
  <TopNavbar navigation = {navigation} page={"MainPage"} />
  <AntDesign name="pluscircle" size={50} color="#FF80ED"
  style={styles.pluscircle} onPress={()=>navigation.navigate('AddPost')} />
  <BottomNavbar navigation = {navigation} page={'MainPage'} />
  <FollowersRandomPost />
  </View>
)
}

export default MainPage

const styles = StyleSheet.create({
container: {
  width: '100%',
  height: '100%',
  paddingVertical: 50
},
pluscircle: {
  position: 'absolute',
  zIndex: 100,
  bottom: 50,
  right: 10,
  borderColor: '#00FF7F',
  borderWidth: .5,
  borderRadius: 25,
  backgroundColor: '#fff',
  shadowColor: 'green',
  shadowOffset: {
    width: 0,
    height: 1
  },
  shadowOpacity: .2,
  shadowRadius: 2,
  elevation: 20
}
})