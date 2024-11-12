import { StyleSheet, Text, View, Image, TextInput, ImageBackground, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import logo from '../../../../assets/pp_logo.png'
import greenBg from '../../../../assets/nft04.jpeg'
import {
 containerFull, logo1, greenBackground,
 brandView, brandViewText, bottomView, goback
} from '../../../CommonCss/pagecss'
import { formTop, formInput, formbtn, formHead3, formHead4 } from '../../../CommonCss/formcss'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Signup_ChoosePassword = ({ navigation, route }) => {
 const { email, username } = route.params
 const [password, setPassword] = useState('')
 const [confirmPassword, setConfirmPassword] = useState('')
 const [loading, setLoading] = useState(false)


 const handlePassword = () => {
   //navigation.navigate('Signup_AccountCreated')
   if (password == '' || confirmPassword == '') {
     Alert.alert('Please Enter A Password')
   } else if (password != confirmPassword) {
     Alert.alert('Passwords do not match!')
   } else {
     setLoading(true)
     fetch('http://10.0.2.2:3000/signup', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({ email: email, username: username, password: password })
     })
       .then(res => res.json()).then(
         data => {
           if (data.message === "You Have Been Registered Successfully!") {
             setLoading(false)
             Alert.alert(data.message)
             navigation.navigate('Login')
           } else {
             setLoading(false)
             Alert.alert("Please try again")
           }
         }
       )
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

         <Text style={formHead4}>Choose a strong password</Text>
         <View style={{ marginTop: 50 }}>
           <TextInput placeholder='Enter Password' style={formInput} secureTextEntry
             onChangeText={(text) => setPassword(text)}
           />
         </View>
         <View style={{ marginTop: 50 }}>
           <TextInput placeholder='Confirm Password' style={formInput} secureTextEntry
             onChangeText={(text) => setConfirmPassword(text)}
           />
         </View>
         <Text style={formbtn}
           onPress={() => handlePassword()}>
           Next
         </Text>
       </View>
     </View>
   </ScrollView>
 )
}


export default Signup_ChoosePassword

const styles = StyleSheet.create({

})
