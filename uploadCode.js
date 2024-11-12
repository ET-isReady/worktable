import { StyleSheet, Text, View, Image, TextInput, ImageBackground, ScrollView, Alert, TouchableOpacity,
    ActivityIndicator } from 'react-native'
    import React, { useState } from 'react'
    import logo from '../../../../assets/pp_logo.png'
    import greenBg from '../../../../assets/nft06.jpeg'
    import { containerFull, logo1, greenBackground,
      brandView, brandViewText, bottomView, goback, row } from '../../../CommonCss/pagecss'
    import Ionicons from 'react-native-vector-icons/Ionicons'
    import { formTop, formInput, formbtn, formHead4, } from '../../../CommonCss/formcss'
 
     
      const ForgotPassword_ChoosePassword = ({navigation, route}) => {
  
      const { email } = route.params
  
      const [ password, setPassword ] = useState('')
      const [ confirmPassword, setConfirmPassword ] = useState('')
      const [ loading, setLoading ] = useState(false)
  
      const handleChangePassword = ()=>{
        if( password == '' || confirmPassword == ''){
          Alert.alert('Please enter password')
        }else if( password != confirmPassword ){
          Alert.alert('Passwords do not match!')
        } else{
          setLoading(true)
          fetch('http://10.0.2.2:3000/resetpassword', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
          })
          .then( res => res.json()).then(
            data => {
              if( data.message === "Password Changed Successfully!"){
                setLoading(false)
                Alert.alert(data.message)
                navigation.navigate('ForgotPassword_AccountRecovered')
              } else{
                setLoading(false)
                Alert.alert("Oops! Something went wrong. Please try again.")
              }
            })
          .catch(err=>{
            setLoading(false)
            Alert.alert(err)
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
  
          <Text style={formHead4}>Choose A New Password</Text>
  
          <View style={{ marginTop: 50 }}>
            <TextInput placeholder='Enter Password' style={formInput}
            onChangeText={(text)=>setPassword(text)}
            />
          </View>
          <View style={{ marginTop: 50 }}>
            <TextInput placeholder='Confirm Password' style={formInput}
            onChangeText={(text)=>setConfirmPassword(text)}
            />
          </View>
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
  
  
  
    export default ForgotPassword_ChoosePassword
  
    const styles = StyleSheet.create({
  
    })