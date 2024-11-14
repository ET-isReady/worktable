import { StyleSheet, Text, View, Image, TextInput, ImageBackground, ScrollView, Input, TouchableOpacity,
    ActivityIndicator, Alert, Dimensions } from 'react-native'
    import AsyncStorage from '@react-native-async-storage/async-storage'
    import React, { useState, useEffect } from 'react'
    import logo from '../../../assets/pp_logo.png'
    import greenBg from '../../../assets/nft03.jpeg'
    import { containerFull, logo1, greenBackground,
      brandView, brandViewText, bottomView, goback } from '../../CommonCss/pagecss'
    import Ionicons from 'react-native-vector-icons/Ionicons'
    import Back from 'react-native-vector-icons/Ionicons'
    import { formTop, formTextLinkCenter, formHead, formHead2, signUp, formInput, formTextLinkRight, formbtn,
      formHead3, formHead5 } from '../../CommonCss/formcss'
    import { storageRef, storage } from '../../Firebase/Config'
    import { launchImageLibrary } from 'react-native-image-picker'
    import { uploadBytes, getDownloadURL } from 'firebase/storage'
    import profiledefault from '../../../assets/profiledefault.jpg'
    import axios from 'axios'

      const UploadProfilePic = ({ navigation })=>{
   
        const [ email, setEmail ] = useState('')
        const [profilepic, setProfilepic] = useState('');
        const [loading, setLoading] = useState(false)
 
 
      //merely pick the image from phone
     const pickImage = async ()=>{
      setLoading(true)
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1
      }).then(res =>{
        if(!res.didCancel){
          const data = res.assets[0].uri
          setProfilepic(data)
        }
      }).catch(error =>{
        console.log(error)
      })
      setLoading(false)
    }
  
     //upload to Firebase
     const handleUpload = async ()=>{
    
      const response = await fetch(profilepic)
      const blob = await response.blob()
 
 
      const reference = storageRef(storage, "profilepics/profilepic")
 
 
      uploadBytes( reference, blob ).then((snapshot)=>{
        getDownloadURL(snapshot.ref).then(( downloadUrl ) =>{
        
      //upload to MongoDB
      AsyncStorage.getItem('user').then(data =>{
        const formdata = {
          email: JSON.parse(data).user.email,
          profilepic: downloadUrl
        }
        axios.post('http://10.0.2.2:3000/update-pic', formdata)
        .then(res =>{console.log(res.data)
          if(res.data.status == 'Ok'){
            Alert.alert('Profile picture updated successfully!')
            navigation.navigate('MainPage')
          }
        })
      })
   
    })
   })
 
 
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
  
        <Text style={styles.formhead}>Update Profile Image</Text>
          <View style={{ marginTop: 50, justifyContent: 'center', alignItems: 'center' }}>
           
          <TouchableOpacity onPress={()=>pickImage()}>
           <Image style={styles.profilePic} source={profiledefault} />
           <Image style={styles.uploadedImage} source={{
             uri: profilepic == ''|| profilepic == null
             ?
             `${profiledefault}`
             : profilepic
           }} />
           <View style={styles.camDiv}>
            <View style={styles.camIconDiv}>
           <Back name='camera' size={22} style={styles.cameraIcon} />
           </View>
           </View>
          </TouchableOpacity>
          
          </View>
          {
            loading ? <ActivityIndicator size="large" color='#00FF7F' />
            :
            <View style={styles.uploadButton}>
            <Text style={styles.button}
              onPress={()=> handleUpload()}>
              Upload Image
            </Text>
            </View>
           
          }
          
        
        </View>
        </View>
        </ScrollView>
      )
    }
 
 
    export default UploadProfilePic
  
    const styles = StyleSheet.create({
      formhead: {
        color: '#0163D2',
        textAlign: 'center',
        fontSize: 16
      },
      profilePic: {
        width: 150,
        height: 150,
        borderRadius: 400/2,
        borderColor: '#0163D2',
        borderWidth: 1
      },
      camDiv: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
      },
      camIconDiv: {
        position: 'absolute',
        right: 14,
        zIndex: 1,
        bottom: -2,
        height: 36,
        width: 36,
        backgroundColor: '#0163D2',
        opacity: .7,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 18,
      },
      uploadedImage: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 1,
        height: 150,
        width: 150,
        borderRadius: 75
       
      },
      cameraIcon: {
        color: 'white'
      },
      uploadButton: {
        bottom: -25
      },
      button: {
        width: Dimensions.get('window').width / 2.5,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#0163D2',
        borderRadius: 25,
        borderColor: 'white',
        borderWidth: 1,
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        paddingVertical: 10,
        marginTop: 50
      }
    })