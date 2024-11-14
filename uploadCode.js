import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React from 'react'
import BottomNavbar from '../../components/BottomNavbar'
import TopNavbar from '../../components/TopNavbar'


type Props = {
   navigation: any
 };


const NotificationPage = ({ navigation }: Props)=>{
return (
  <View style={styles.container}>
  <StatusBar />
  <TopNavbar navigation = {navigation} />
  <BottomNavbar navigation = {navigation} page={"NotificationPage"} />
  <View style={styles.c1}>
  <View style={styles.notification}>
    <Text>Some Shoutouts</Text>
  </View>
  <View style={styles.notification}>
    <Text>Some Shoutouts</Text>
  </View>
  <View style={styles.notification}>
    <Text>Some Shoutouts</Text>
  </View>
  <View style={styles.notification}>
    <Text>Some Shoutouts</Text>
  </View>
  </View>
  </View>
)
}








export default NotificationPage




const styles = StyleSheet.create({
container: {
width: '100%',
height: '100%',
paddingVertical: 50
},
c1: {
  width: '100%',
  height: '100%',
  alignItems: 'center'
},
notification: {
  width: '98%',
  height: 50,
  backgroundColor: 'grey',
  marginTop: 10,
}
})

   