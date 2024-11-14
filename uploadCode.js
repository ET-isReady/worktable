import { StyleSheet, Text, View, Image, TextInput, ImageBackground, ScrollView, Input, TouchableOpacity,
    ActivityIndicator, Alert } from 'react-native'
    import AsyncStorage from '@react-native-async-storage/async-storage'
    import React, { useState } from 'react'
    import logo from '../../../assets/pp_logo.png'
    import greenBg from '../../../assets/nft06.jpeg'
    import { containerFull, logo1, greenBackground,
      brandView, brandViewText, bottomView, goback, row } from '../../CommonCss/pagecss'
    import Ionicons from 'react-native-vector-icons/Ionicons'
    import { formTop, formTextLinkCenter, formHead, formHead2, signUp, formInput, formTextLinkRight, formbtn,
      formHead3, formHead4, formbtn2, formHead5, formInputOld, changePasswordLink } from '../../CommonCss/formcss'
 
  
    const ChangePassword = ({ navigation })=>{
  
      const [ oldPassword, setOldPassword ] = useState('')
      const [ newPassword, setNewPassword ] = useState('')
      const [ confirmNewPassword, setConfirmNewPassword ] = useState('')
      const [ loading, setLoading ] = useState(false)
  
      const handleChangePassword = ()=>{
        if( oldPassword === '' || newPassword === '' || confirmNewPassword === '' ){
          Alert.alert('Please fill all the fields')
        } else if( newPassword !== confirmNewPassword ){
          Alert.alert('New password and confirm new password must be the same.')
        } else{
          setLoading(true)
          AsyncStorage.getItem('user')
          .then(data => {
                      fetch('http://10.0.2.2:3000/changepassword', {
                          method: 'POST',
                          headers: {
                              'Content-Type': 'application/json',
                              "Authorization": 'Bearer ' + JSON.parse(data).tokens
                          },
                          body: JSON.stringify({ email: JSON.parse(data).user.email,
                            oldPassword: oldPassword,
                            newPassword: newPassword
                          })
                      })
                          .then(res => res.json()).then(data => {
                              if (data.message == 'Password Changed Successfully!') {
                                  setLoading(false)
                                  Alert.alert('Password Changed Successfully!')
                                  AsyncStorage.removeItem('user')
                                  navigation.navigate('Login')
                              }
                              else {
                                  Alert.alert('Wrong Password')
                                  setLoading(false)
                              }
                          })
                  })
          }
      }
  
  
      return (
  
        <ScrollView style={containerFull}>
        <ImageBackground source={greenBg} style={greenBackground}>
        <View>
        <TouchableOpacity style={goback} onPress={()=> navigation.navigate('Settings')}>
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
  
          <Text style={formHead4}>Choose A New Password</Text>
  
          <View style={{ marginTop: 10 }}>
  
            <TextInput placeholder='Enter Old Password' style={formInputOld}
            onChangeText={(text)=>setOldPassword(text)}
            />
            <TextInput placeholder='Enter New Password' style={formInput}
            onChangeText={(text)=>setNewPassword(text)}
            />
          </View>
          <View style={{ marginTop: 50 }}>
            <TextInput placeholder='Confirm New Password' style={formInput}
            onChangeText={(text)=>setConfirmNewPassword(text)}
            />
          </View>
          {/* <Text style={changePasswordLink}
          onPress={()=>navigation.navigate('ForgotPassword_EnterEmail')}>
          Forgot Password?</Text> */}
          {
            loading ?
            <ActivityIndicator size="large" color='#00FF7F' />
            :
            <Text style={formbtn}
              onPress={()=> handleChangePassword()}>
              Next
            </Text>
          }
  
        </View>
        </View>
        </ScrollView>
      )
    }
  
    export default ChangePassword
  
    const styles = StyleSheet.create({
      container: {
  
      }
    })