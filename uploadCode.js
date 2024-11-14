import { StyleSheet, Text, View, Image, TextInput, ImageBackground, ScrollView, Input, TouchableOpacity,
    ActivityIndicator, Alert } from 'react-native'
    import AsyncStorage from '@react-native-async-storage/async-storage'
    import React, { useState } from 'react'
    import logo from '../../../assets/pp_logo.png'
    import greenBg from '../../../assets/nft03.jpeg'
    import { containerFull, logo1, greenBackground,
      brandView, brandViewText, bottomView, goback } from '../../CommonCss/pagecss'
      import Ionicons from 'react-native-vector-icons/Ionicons'
    import { formTop, formTextLinkCenter, formHead, formHead2, signUp, formInput, formTextLinkRight, formbtn,
      formHead3, formHead5 } from '../../CommonCss/formcss'

    const ChangeUserHeader = ({ navigation })=>{
  
  
      const [userheader, setUserHeader ] = useState('')
      const [loading, setLoading] = useState(false)
  
      const handleUserHeader = () => {
          if ( userheader == '') {
              Alert.alert('Please Enter Your Header')
          }
          else {
              setLoading(true)
              AsyncStorage.getItem('user').then(
                    data => {
                        fetch('http://10.0.2.2:3000/setuserheader', {
                            method: 'post',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                email: JSON.parse(data).user.email,
                                userheader: userheader
                            })
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.message === "Profile Header Updated!") {
                                    setLoading(false)
                                    Alert.alert('Your info has been updated!')
                                    navigation.navigate('MainPage')
                                }
                                else if (data.error === "Invalid Credentials") {
                                    Alert.alert('Invalid Credentials')
                                    setLoading(false)
                                    navigation.navigate('Login')
                                }
                                else {
                                    setLoading(false)
                                    Alert.alert("Please Try Again");
                                }
                            })
                            .catch(err => {
                                Alert.alert('Something went wrong')
                                setLoading(false)
                            })
                    }
                )
                    .catch(err => {
                        Alert.alert('Something went wrong')
                        setLoading(false)
                    })
            }
  
            // navigation.navigate('Signup_ChoosePassword')
        }
       
      return (
  
        <ScrollView style={containerFull}>
        <ImageBackground source={greenBg} style={greenBackground}>
        <View>
        <TouchableOpacity style={goback} onPress={()=> navigation.navigate('EditProfile')}>
        <Ionicons name="arrow-undo-circle" size={40} color="white"/>
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
  
        <Text style={formHead5}>Update Your General Information</Text>
          <View style={{ marginTop: 50 }}>
            <TextInput placeholder='Enter New Info' style={formInput}
            onChangeText={(text)=>setUserHeader(text)}
            multiline={true}
            numberOfLines={4}
            />
          </View>
          {
            loading ? <ActivityIndicator />
            :
            <Text style={formbtn}
              onPress={()=> handleUserHeader()}>
              Save
            </Text>
          }
        </View>
        </View>
        </ScrollView>
      )
    }
  
    export default ChangeUserHeader
  
    const styles = StyleSheet.create({
  
    })