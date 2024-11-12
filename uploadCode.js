import {
    StyleSheet, Text, View, Image, TextInput, ImageBackground, ScrollView, TouchableOpacity,
    ActivityIndicator, Alert
   } from 'react-native'
   import React, { useState } from 'react'
   import logo from '../../../../assets/pp_logo.png'
   import greenBg from '../../../../assets/nft03.jpeg'
   import {
    containerFull, logo1, greenBackground,
    brandView, brandViewText, bottomView, goback
   } from '../../../CommonCss/pagecss'
   import { formTop, formHead2, formInput, formbtn, formHead5 } from '../../../CommonCss/formcss'
   import Ionicons from 'react-native-vector-icons/Ionicons'
 

   const Signup_ChooseUsername = ({ navigation, route }) => {
   
   
    const { email } = route.params
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(false)
   
   
    const handleUsername = () => {
      if (username == '') {
        Alert.alert('Please enter username')
      }
      else {
        setLoading(true)
        fetch('http://10.0.2.2:3000/changeusername', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            username: username
          })
        })
          .then(res => res.json()).then(
            data => {
              if (data.message === "Username Available!") {
                setLoading(false)
                Alert.alert('Username has been set!')
                navigation.navigate('Signup_ChoosePassword', { email: email, username: username })
              }
              else {
                setLoading(false)
                Alert.alert("Username not available");
              }
            }
          ).catch(err => {
            console.log(err)
          })
      }
    }
    return (
   
   
      <ScrollView style={containerFull}>
        <ImageBackground source={greenBg} style={greenBackground}>
          <View>
            <TouchableOpacity style={goback} onPress={() => navigation.navigate('Login')}>
              <Ionicons name="arrow-undo-circle" size={40} color="white" />
            </TouchableOpacity>
            <Text style={{
              fontSize: 16, fontWeight: 'bold', color: 'white', marginVertical: 40, marginLeft: 65,
              position: 'absolute'
            }}>Go back</Text>
          </View>
          <View style={brandView}>
            <Image style={logo1} source={logo} />
            <Text style={brandViewText}>Poetionpics</Text>
          </View>
        </ImageBackground>
   
   
        <View style={bottomView}>
          <View style={formTop}>
   
   
            <Text style={formHead2}>Great!</Text>
            <Text style={formHead5}>Now Choose a Username</Text>
            <View style={{ marginTop: 50 }}>
              <TextInput placeholder='Enter Username' style={formInput}
                onChangeText={(text) => setUsername(text)}
              />
            </View>
            {
              loading ? <ActivityIndicator />
                :
                <Text style={formbtn}
                  onPress={() => handleUsername()}>
                  Next
                </Text>
            }
          </View>
        </View>
      </ScrollView>
    )
   }
   
   
   export default Signup_ChooseUsername
   
   
   const styles = StyleSheet.create({
   
   
   })
   
