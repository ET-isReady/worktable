import {
    StyleSheet, Text, View, Image, TextInput, ImageBackground, SafeAreaView, Platform, TouchableOpacity,
    ActivityIndicator, Alert, ScrollView, Pressable
    } from 'react-native'
    import AsyncStorage from '@react-native-async-storage/async-storage'
    import React, { useState, useEffect } from 'react'
    import logo from '../../assets/pp_logo.png'
    import greenBg from '../../assets/nft03.jpeg'
    import {
    containerFull, logo1, greenBackground,
    brandView, brandViewText, bottomView, goback
    } from '../../CommonCss/pagecss'
    import Ionicons from 'react-native-vector-icons/Ionicons'
    import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
    import FontAwesome from 'react-native-vector-icons/FontAwesome'
    import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
    import AntDesign from 'react-native-vector-icons/AntDesign'
    import Entypo from 'react-native-vector-icons/Entypo'
    import Feather from 'react-native-vector-icons/Feather'
    import {
    formTop, formTextLinkCenter, formHead, formHead2, signUp, formInput, formTextLinkRight, formbtn,
    formHead3, formHead5
    } from '../../CommonCss/formcss'
    import { storageRef, storage, firebase } from '../../Firebase/Config'
    import { uploadBytes, getDownloadURL } from 'firebase/storage'
    import { launchImageLibrary } from 'react-native-image-picker'
    import { useRoute } from '@react-navigation/native'
   
    const AddPost = ({ navigation }) => {
   
    const [ sport, setSport ] = useState('')
    const [ area, setArea ] = useState('')
    const [ date, setDate ] = useState('')
    const [ timeInterval, setTimeInterval ] = useState('')
    const [ selected, setSelected ] = useState(['Public'])
    const [ noOfPlayers, setnoOfPlayers ] = useState('')
   
    const route = useRoute() 
    const [ taggedVenue, setTaggedVenue ] = useState(null)
   
    useEffect(()=>{
    if(route?.params?.taggedVenue){
    setTaggedVenue(route?.params?.taggedVenue)
    }
    }, [route?.params])
   
    return (
    <SafeAreaView style={styles.container1}>
    <ScrollView>
    <View style={{ marginHorizontal: 10 }}>
    <Ionicons name='arrow-back' size={24} color='black' />
    </View>
    <View style={{ padding: 10 }}>
    <Text style={{ fontSize: 25, fontWeight: 'bold' }}>AddPost</Text>
   
    <Pressable style={styles.pressable1}>
    <MaterialCommunityIcons name='whistle' size={24} color='gray' />
    <View style={{ flexDirection: 'row' }}>
    <Text style={{ fontSize: 17, fontWeight: '500' }}>Sport</Text>
    <TextInput style={styles.textInput1} 
    value={ sport } 
    onChangeText={ setSport } 
    placeholderTextColor='gray'
    placeholder='Baseball/Soccer/Football'
    />
    </View>
   
    <AntDesign name='arrowright' size={24} color='gray' />
    
    </Pressable>
   
    <Text style={{ borderColor: '#e0e0e0', borderWidth: 1, height: 1 }} />
   
   
   
   
   
   
    <Pressable onPress={()=> navigation.navigate('TagVenueScreen')} 
    style={styles.pressable1}>
    <Entypo name='location' size={24} color='gray' />
    <View style={{ flexDirection: 'row' }}>
    <Text style={{ fontSize: 17, fontWeight: '500' }}>Area</Text>
    <TextInput style={styles.textInput1} 
    value={ area ? area : taggedVenue } 
    onChangeText={ setArea } 
    placeholderTextColor='gray'
    placeholder='Locality or Venue Name'
    />
    </View>
   
    <AntDesign name='arrowright' size={24} color='gray' />
    
    </Pressable>
   
   
   
   
   
   
   
    <Text style={{ borderColor: '#e0e0e0', borderWidth: 1, height: 1 }} />
   
    <Pressable style={styles.pressable1}>
    <Feather name='calendar' size={24} color='gray' />
    <View style={{ flexDirection: 'row' }}>
    <Text style={{ fontSize: 17, fontWeight: '500' }}>Date</Text>
    <TextInput style={styles.textInput1} 
    editable={false} 
    placeholderTextColor={ date ? 'black' : 'gray'}
    placeholder={ date ? date : 'Pick a Date' }
    />
    </View>
   
    <AntDesign name='arrowright' size={24} color='gray' />
    
    </Pressable>
   
    <Text style={{ borderColor: '#e0e0e0', borderWidth: 1, height: 1 }} />
   
    <Pressable style={styles.pressable1}>
    <AntDesign name='clockcircleo' size={24} color='gray' />
    <View style={{ flexDirection: 'row' }}>
    <Text style={{ fontSize: 17, fontWeight: '500' }}>Time</Text>
    <TextInput style={styles.textInput1} 
    placeholderTextColor={ timeInterval ? 'black' : 'gray'}
    placeholder={ timeInterval ? timeInterval : 'Pick a Time' }
    />
    </View>
   
    <AntDesign name='arrowright' size={24} color='gray' />
    
    </Pressable>
   
    <Text style={{ borderColor: '#e0e0e0', borderWidth: 1, height: 1 }} />
    <View>
    <Feather name='activity' size={24} color='gray' />
    <View>
    <Text style={{ marginBottom: 10, fontSize: 15, fontWeight: '500'}}>Activity Access</Text>
    <Pressable style={{ flexDirection: 'row', alignItems: 'center'}}>
    <Pressable
    onPress={() => setSelected('Public')}
    style={
    selected.includes('Public')
    ? {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#07bc0c',
    width: 140,
    justifyContent: 'center',
    borderRadius: 3,
    padding: 10,
    }
    : {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'white',
    width: 140,
    justifyContent: 'center',
    borderRadius: 3,
    padding: 10,
    }
    }>
    <Ionicons
    name="earth"
    size={24}
    color={selected.includes('Public') ? 'white' : 'black'}
    />
    <Text
    style={
    selected.includes('Public')
    ? {color: 'white', fontWeight: 'bold', fontSize: 15}
    : {color: 'black', fontWeight: 'bold', fontSize: 15}
    }>
    Public
    </Text>
    </Pressable>
    <Pressable
    onPress={() => setSelected('Invite Only')}
    style={
    selected.includes('Invite Only')
    ? {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#07bc0c',
    width: 140,
    justifyContent: 'center',
    borderRadius: 3,
    padding: 10,
    }
    : {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'white',
    width: 140,
    justifyContent: 'center',
    borderRadius: 3,
    padding: 10,
    }
    }>
    <AntDesign
    name="lock1"
    size={24}
    color={selected.includes('Invite Only') ? 'white' : 'black'}
    />
    <Text
    style={
    selected.includes('Invite Only')
    ? {color: 'white', fontWeight: 'bold', fontSize: 15}
    : {color: 'black', fontWeight: 'bold', fontSize: 15}
    }>
    Invite Only
    </Text>
    </Pressable>
    </Pressable>
    </View>
    </View>
    <Text style={{ borderColor: '#e0e0e0', borderWidth: 1, height: 1, marginTop: 10 }} />
    <Text style={{ marginTop: 20, fontSize: 16 }}>Total Players</Text>
   
    <View style={styles.container3}>
    <View style={{ marginVertical: 5 }}>
    <View>
    <TextInput style={styles.textInput2} 
    value={noOfPlayers} 
    onChangeText={setnoOfPlayers} 
    placeholder="Total Players (including you)"
    />
    </View>
    </View>
    </View>
    <Text style={{ borderColor: '#e0e0e0', borderWidth: 1, height: 1, marginTop: 10 }} />
    <Text style={{ fontSize: 16, marginTop: 20 }}>Add Instructions</Text>
    <View style={{ padding: 10, backgroundColor: '#f0f0f0', marginTop: 10, borderRadius: 6 }}>
    <View style={{ marginVertical: 5, alignItems: 'center', gap: 8 }}>
    <Ionicons name='bag-check' size={24} color='red' />
    <Text style={{ flex: 1, fontSize: 15, fontWeight: '500'}}>Bring your own equipment</Text>
    <FontAwesome name='check-square' size={24} color='green' />
    </View>
   
    <View style={{ marginVertical: 5, alignItems: 'center', gap: 8 }}>
    <MaterialCommunityIcons name='directions-fork' size={24} color='#febe10' />
    <Text style={{ flex: 1, fontSize: 15, fontWeight: '500'}}>Cost Shared</Text>
    <FontAwesome name='check-square' size={24} color='green' />
    </View>
   
    <View style={{ marginVertical: 5, alignItems: 'center', gap: 8 }}>
    <FontAwesome5 name='syringe' size={24} color='green' />
    <Text style={{ flex: 1, fontSize: 15, fontWeight: '500'}}>Covid Vaccinated Players Preferred</Text>
    <FontAwesome name='check-square' size={24} color='green' />
    </View>
    <TextInput style={styles.textInput3} 
    placeholder='Add Additional Instructions'
    />
    </View>
    <View>
    <AntDesign name='setting' size={24} color='black' />
    <View style={{ flex: 1 }}>
    <Text style={{ fontSize: 17, fontWeight: '500' }}>Advanced Settings</Text>
    </View>
    <AntDesign name='arrowright' size={24} color='green' />
    </View>
    </View>
    </ScrollView>
    </SafeAreaView>
    )
    }
    export default AddPost
    const styles = StyleSheet.create({
    container1: {
    flex: 1,
    backgroundColor: 'white',
    // paddingTop: Platform.OS == 'android' ? 20 : 0
    },
    container2: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginTop: 7,
    marginVertical: 10
    },
    container3: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginTop: 10,
    borderRadius: 6
    },
    pressable1: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-between'
    },
    textInput1: {
    marginTop: 7,
    fontSize: 15
    },
    textInput2: {
    padding: 10,
    backgroundColor: 'white',
    borderColor: '#d0d0d0',
    borderWidth: 1,
    borderRadius: 4
    },
    textInput3: {
    padding: 10, 
    backgroundColor: 'white', 
    borderColor: '#d0d0d0', 
    borderWidth: 1, 
    marginVertical: 8, 
    borderRadius: 6 
    }
    })