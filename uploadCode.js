import { StyleSheet, Text, View, Image, TextInput, ImageBackground, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import logo from '../../../../assets/pp_logo.png'
import greenBg from '../../../../assets/nft01.png'
import { containerFull, logo1, greenBackground,
brandView, brandViewText, bottomView, goback, row } from '../../../CommonCss/pagecss'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { formTop, formHead2, formbtn2 } from '../../../CommonCss/formcss'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


  const ForgotPassword_AccountRecovered = ({ navigation }) => {
    
return (

  <ScrollView style={containerFull}>
  <ImageBackground source={greenBg} style={greenBackground}>
  <View>
  <TouchableOpacity style={goback} onPress={()=> navigation.navigate('Login')}>
  <Ionicons name="arrow-undo-circle" size={40} color="white" />
  </TouchableOpacity>
  <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white', marginVertical: 40, marginLeft: 65,
  position: 'absolute'}}>Go back</Text>
  </View>
  <View style={brandView}>
  <Image style={logo1} source={logo}/>
  <Text style={brandViewText}>Poetionpics</Text>
  </View>
  </ImageBackground>

  <View style={bottomView}>
  <View style={formTop}>

  <View style={row}>
  <Text style={formHead2}>Password Changed Successfully! </Text>
    <MaterialCommunityIcons name="check-decagram" size={30} color="#99B83C" />
  </View>
  <Text style={formbtn2}
  onPress={()=> navigation.navigate('Login')}>
    Let's do this!
  </Text>
  </View>
  </View>
  </ScrollView>
)
}


export default ForgotPassword_AccountRecovered

const styles = StyleSheet.create({

})