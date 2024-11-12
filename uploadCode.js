import { StyleSheet, Text, View, Image, TextInput, ImageBackground, ScrollView, TouchableOpacity,
    ActivityIndicator, Alert } from 'react-native'
    import React, { useState } from 'react'
    import logo from '../../../../assets/pp_logo.png'
    import greenBg from '../../../../assets/purple_tech.jpeg'
    import { containerFull, logo1, greenBackground,
      brandView, brandViewText, bottomView, goback } from '../../../CommonCss/pagecss'
    import { formTop, formInput, formbtn, formHead5 } from '../../../CommonCss/formcss'
    import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
    import Ionicons from 'react-native-vector-icons/Ionicons'


    const ForgotPassword_EnterEmail = ({ navigation })=>{
  
      const [email, setEmail] = useState('')
      const [loading, setLoading] = useState(false)
  
      const handleEmail = ()=>{
        if(email === ''){
          Alert.alert('Please Enter Your Email')
        } else{
          setLoading(true)
          fetch('http://10.0.2.2:3000/verifyfp', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
          })
          .then(res => res.json()).then(data => {
            if(data.error === "Invalid Credentials"){
            //alert('Invalid Credentials')
            Alert.alert('Invalid Credentials')
            setLoading(false)
          }
          else if (data.message === "Verification Code Sent to your Email") {
            setLoading(false)
            Alert.alert(data.message);
            navigation.navigate('ForgotPassword_EnterVerificationCode', {
              useremail: data.email,
              userVerificationCode : data.VerificationCode
            })
          }
          })
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
  
          <Text style={formHead5}>Please Verify Your Email</Text>
  
          <View style={{ marginTop: 50 }}>
            <TextInput keyboardType='email-address' placeholder='Enter Your Email' style={formInput}
            onChangeText={(text)=>setEmail(text)}
            />
          </View>
          {
            loading ?
            <ActivityIndicator size="large" color='#00FF7F' /> :
            <Text style={formbtn}
              onPress={()=> handleEmail()}>
              Next
            </Text>
          }
        </View>
        </View>
        </ScrollView>
      )
    }
  
    export default ForgotPassword_EnterEmail
  
    const styles = StyleSheet.create({
  
    })