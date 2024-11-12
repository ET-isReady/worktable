import { StyleSheet, Text, View, Image, TextInput, ImageBackground, ScrollView,
    ActivityIndicator, Alert} from 'react-native'
    import AsyncStorage from '@react-native-async-storage/async-storage'
    import React, { useState, useEffect } from 'react'
 
 
    import { loadUser, loginUser } from '../../../../redux/actions/userAction'
    import { useDispatch, useSelector } from 'react-redux'
 
 
    import logo from '../../../../assets/pp_logo.png'
    import greenBg from '../../../../assets/green_tech.jpeg'
    import { containerFull, logo1, greenBackground,
      brandView, brandViewText, bottomView } from '../../../CommonCss/pagecss'
    import { formTop, formTextLinkCenter, formHead, signUp, formInput, formTextLinkRight, formbtn } from '../../../CommonCss/formcss'
    import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
    import Ionicons from 'react-native-vector-icons/Ionicons'

     
      const Login = ({navigation}) => {
       
          const { error, isAuthenticated } = useSelector(( state ) => state.user)
          const [ email, setEmail ] = useState('')
          const [ password, setPassword ] = useState('')
          const [ loading, setLoading ] = useState('')
          const dispatch = useDispatch()
         
         
          const handleLogin = (e)=>{
           
          loginUser( email, password )(dispatch)
 
 
          if( email == '' || password == ''){
                    Alert.alert('Please Fill In Email & Password Fields!')
                  } else{
                    setLoading(true)
                    fetch('http://10.0.2.2:3000/login', {
                      method: 'post',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        email,
                        password
                      })
                    })
                    .then( res => res.json())
                    .then( async data =>{
                      if(data.error){
                        setLoading(false)
                        Alert.alert(data.error)
                      } else if( data.message == 'Successfully Signed In!'){
                        setLoading(false)
                        await AsyncStorage.setItem('user', JSON.stringify(data))
                        navigation.navigate('MainPage', { data })
                      }
                    })
                    .catch( err => {
                      setLoading(false)
                      Alert.alert(err)
                    })
         
          }
        }
       
    
          // useEffect(()=>{
          //   if(error){
          //   Alert.alert(error)
          //   console.log(error)
          //   }
          //   if(isAuthenticated)
          //   navigation.navigate('MainPage')
          //   Alert.alert("Login Successful!")
           
          //   }, [])
     
  
      return (
        <ScrollView style={containerFull}>
        <ImageBackground source={greenBg} style={greenBackground}>
        <View style={brandView}>
        <Image style={logo1} source={logo}/>
        <Text style={brandViewText}>Poetionpics</Text>
        </View>
        </ImageBackground>
  
        <View style={bottomView}>
        <View style={formTop}>
          <Text style={formHead}>Welcome!</Text>
          <Text style={formTextLinkCenter}>
          Don't have an account?
          <Text style={signUp}
          onPress={()=> navigation.navigate('Signup_EnterEmail')}
          > Register Now</Text>
          </Text>
          <View style={{ marginTop: 50 }}>
            <TextInput keyboardType='email-address' placeholder='Enter Your Email' style={formInput}
            onChangeText={(text)=>setEmail(text)}
            />
          </View>
          <View style={{ marginTop: 50 }}>
            <TextInput secureTextEntry={true} placeholder='Enter Your Password' style={formInput}
            onChangeText={(text)=>setPassword(text)}
            />
          </View>
  
          {/* {
            loading ?
            <ActivityIndicator size="large" color='#00FF7F' /> : */}
            <Text style={formbtn} onPress={handleLogin}>
            Login
            </Text>
          {/* } */}
  
          <Text style={formTextLinkRight}
          onPress={()=>navigation.navigate('ForgotPassword_EnterEmail')}>
          Forgot Password?</Text>
        </View>
        </View>
  
        </ScrollView>
      )
    }
  
    export default Login
  
    const styles = StyleSheet.create({
  
    })