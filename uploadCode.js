import { StyleSheet, Text, View, Image, TextInput, ImageBackground, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import logo from '../../../../assets/pp_logo.png'
import greenBg from '../../../../assets/nft02.jpeg'
import { containerFull, logo1, greenBackground,
brandView, brandViewText, bottomView, goback, row } from '../../../CommonCss/pagecss'
import { formTop, formInput, formbtn, formHead3 } from '../../../CommonCss/formcss'
import Ionicons from 'react-native-vector-icons/Ionicons'


const ForgotPassword_EnterVerificationCode = ({ navigation, route })=>{

const { useremail, userVerificationCode } = route.params
const [ verificationCode, setVerificationCode ] = useState('')
console.log(useremail, userVerificationCode)


const handleVerificationCode = ()=>{
  if(verificationCode != userVerificationCode) {
    Alert.alert('Invalid Verification Code!')
  } else{
    Alert.alert('Verification Code Matched!')
    navigation.navigate('ForgotPassword_ChoosePassword', { email: useremail })
  }
}

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

    <Text style={formHead3}>A verification code has been sent to your email.</Text>

    <View style={{ marginTop: 50 }}>
      <TextInput placeholder='Enter 6-Digit Code Here' style={formInput}
        onChangeText={(text)=>setVerificationCode(text)}
       />
    </View>
    <Text style={formbtn}
      onPress={()=> handleVerificationCode()}>
      Next
    </Text>
  </View>
  </View>
  </ScrollView>
)
}

export default ForgotPassword_EnterVerificationCode

const styles = StyleSheet.create({

})