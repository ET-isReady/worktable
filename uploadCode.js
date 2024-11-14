import {
    StyleSheet, Text, View, Image, TextInput, ImageBackground, ScrollView, TouchableOpacity,
    ActivityIndicator, Alert
   } from 'react-native'
   import AsyncStorage from '@react-native-async-storage/async-storage'
   import React, { useState, useEffect } from 'react'
   import logo from '../../../assets/pp_logo.png'
   import greenBg from '../../../assets/nft03.jpeg'
   import {
    containerFull, logo1, greenBackground,
    brandView, brandViewText, bottomView, goback
   } from '../../CommonCss/pagecss'
   import Ionicons from 'react-native-vector-icons/Ionicons'
   import FontAwesome from 'react-native-vector-icons/FontAwesome'
   import AntDesign from 'react-native-vector-icons/AntDesign'
   import {
    formTop, formTextLinkCenter, formHead, formHead2, signUp, formInput, formTextLinkRight, formbtn,
    formHead3, formHead5
   } from '../../CommonCss/formcss'
   import { storageRef, storage, firebase } from '../../Firebase/Config'
   import { uploadBytes, getDownloadURL } from 'firebase/storage'
   import { launchImageLibrary } from 'react-native-image-picker'
   import { useDispatch, useSelector } from 'react-redux';
   import { createPostAction } from '../../../redux/actions/postAction'
   type Props = {
    navigation: any
   };
   const AddPost = ({ navigation }: Props) => {
    const { user } = useSelector((state: any) => state.user);
    console.log(user)
    const [activeIndex, setActiveIndex] = useState(0)
    const [active, setActive] = useState(false)
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [ post, setPost ] = useState('')
    useEffect(() => {
      if (replies.length === 1 && replies[0].title === '' && replies[0].image === '') {
        setReplies([])
      }
    }, [])
    const [loading1, setLoading1] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [replies, setReplies] = useState([
      {
        title: '',
        image: '',
        user
      }
    ])
    const handleTitleChange = (index: number, text: string) => {
      setReplies(prevPost => {
        const updatedPost = [...prevPost]
        updatedPost[index] = { ...updatedPost[index], title: text }
        return updatedPost
      })
    }
    //merely pick the image from phone
    const uploadImage = async (index: number) => {
      setLoading1(true)
      const result = await launchImageLibrary({
        mediaType: 'mixed',
        quality: 1
      }).then(res => {
        if (!res.didCancel) {
          let data = res.uri || res.assets?.[0]?.uri
          setImage(data)
          if (image) {
            setReplies(prevPost => {
              const updatedPost = [...prevPost]
              updatedPost[index] = {
                ...updatedPost[index],
                image: image
              
              }
              return updatedPost
            
            })
          }
          // console.log('RESULT=====> ', image)
          setLoading1(false)
        }
      
      })
    }
    //code below is how to add more threads to the existing thread
    const addNewThread = () => {
    
      if (replies[activeIndex].title !== '' || replies[activeIndex].image !== '') {
        setReplies(prevPost => [...prevPost, { title: '', image: '', user }])
        setActiveIndex(replies.length)
      }
    
    }
    const removeThread = (index: number) => {
      if (replies.length > 0) {
        const updatedPost = [...replies]
        updatedPost.splice(index, 1)
        setReplies(updatedPost)
        setActiveIndex(replies.length - 1)
      } else {
        setReplies([{ title: '', image: '', user }])
      }
    }
    const addFreshNewThread = async () => {
      if (title !== '' || image !== '') {
        setActive(true)
        setReplies((prevPost) => [...prevPost, { title: '', image: '', user }])
        setActiveIndex(replies.length)
        const response = await fetch(image)
        const blob = await response.blob()
      
        var storageRef = firebase.storage().ref();
        const ref = storageRef.child(image)
        const snapshot = await ref.put(blob)
        const url = await getDownloadURL(snapshot.ref)
        setImage(url)
        //console.log('This is your url', url)
        return url
      }
    }
    // const pickImage = async () => {
    //   setLoading1(true)
    //       const result = await launchImageLibrary({
    //        mediaType: 'mixed',
    //        quality: 1
    //      }).then(res => {
    //        if (!res.didCancel) {
    //        const data = res.uri || res.assets?.[0]?.uri
    //        setImage(data)
    //      }
    //     }).catch(error =>{
    //       console.log(error)
    //     })
    //     setLoading1(false)
    // }
      //  console.log('This is your image ', image)
    const postImageUpload = async () => {
      setLoading1(true)
          const result = await launchImageLibrary({
           mediaType: 'mixed',
           quality: 1
         }).then(res => {
           if (!res.didCancel) {
           const data = res.uri || res.assets?.[0]?.uri
           setLoading1(false)
           setImage(data)
           setPost(data)
           console.log('this is your data ', data)
          } else{
            setLoading1(false)
            setPost(null)
          }
        })
      }
     const createPost = async () => {
      setLoading2(true)
      AsyncStorage.getItem('user')
      .then(data =>{
          fetch('http://10.0.2.2:3000/posttoprofile', {
              method: 'post',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  email: JSON.parse(data).user.email,
                  post: post
              })
          })
          .then(res => res.json())
          .then(data =>{
              if(data.message == 'Post Added Successfully'){
              Alert.alert('Post Added Successfully!')
              setLoading2(false)
              navigation.navigate('My_UserProfile')
          } else{
              Alert.alert('Something went wrong, please try again')
              setLoading2(false)
          }
      })
      })
        if(title !== '' || image !== ''){
        createPostAction(title, image, user, replies)(dispatch)
      if(!image.cancelled){
        const response = await fetch(image)
        const blob = await response.blob()
      
        var storageRef = firebase.storage().ref();
        const ref = storageRef.child(image)
        const snapshot = await ref.put(blob)
        const url = await getDownloadURL(snapshot.ref)
        setImage(url)
        //console.log('This is your url', url)
        return url
   
   
       } else{
        return null
       }
     
        }
      
    }
    return (
      <ScrollView style={containerFull}>
        <ImageBackground source={greenBg} style={greenBackground}>
          <View>
            <TouchableOpacity style={goback} onPress={() => navigation.navigate('MainPage')}>
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
            {
              loading1 ? <ActivityIndicator size="large" color='#00FF7F' /> :
                <>
                  <Text style={formHead5}>Create A Cloudbook</Text>
                </>
            }
            <View>
              <View style={styles.c1}>
                <TouchableOpacity>
                  <FontAwesome name="close" size={20} color="black" />
                </TouchableOpacity>
                <Text style={styles.text1}>New Thread</Text>
              </View>
              {/* THIS IS THE CREATE POST CODE BELOW */}
              <View style={styles.c1}>
                <Image source={{ uri: user?.profilepic }}
                  style={styles.profilePic}
                />
                <Text style={styles.username}>
                  {user?.username}
                </Text>
                <View style={{ paddingLeft: 140, }}>
                  <TouchableOpacity>
                    <FontAwesome name="close" size={20} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              <TextInput
                placeholder='Start a thread...'
                placeholderTextColor={'#000'}
                value={title}
                onChangeText={text => setTitle(text)}
              />
              <TouchableOpacity onPress={postImageUpload}>
                <AntDesign name="link" size={20} color="black" />
              </TouchableOpacity>
              {
                image && (
                  <Image style={styles.nft_image} resizeMode='contain' source={{ uri: image }} />
                )
              }
              {
                replies.length === 0 && (
                  <View>
                    <Image source={{ uri: user?.profilepic }}
                      style={styles.profilePic} />
                    <Text onPress={addFreshNewThread}>
                      Add to thread...
                    </Text>
                  </View>
                )}
              {/* CREATE POST CODE IS ABOVE THIS MARK  */}
              {
                replies.map((item, index) => (
                  <View key={index}>
                    {/* COPY THE CODE BELOW */}
                    <View style={styles.c1}>
                      <Image source={{ uri: user?.profilepic }}
                        style={styles.profilePic}
                      />
                      <Text style={styles.username}>
                        {user?.username}
                      </Text>
                      <View style={{ paddingLeft: 140, }}>
                        <TouchableOpacity onPress={() => removeThread(index)}>
                          <FontAwesome name="close" size={20} color="black" />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <TextInput
                      placeholder='Start a thread...'
                      placeholderTextColor={'#000'}
                      value={item.title}
                      onChangeText={text => handleTitleChange(index, text)}
                    />
                    <TouchableOpacity onPress={() => uploadImage(index)}>
                      <AntDesign name="link" size={20} color="black" />
                    </TouchableOpacity>
                    {
                      item.image && (
                        <Image style={styles.nft_image} resizeMode='contain' source={{ uri: item.image }} />
                      )
                    }
                    {
                      index === activeIndex && (
                        <View>
                          <Image source={{ uri: user?.profilepic }}
                            style={styles.profilePic} />
                          <Text onPress={addNewThread}>
                            Add to thread...
                          </Text>
                        </View>
                      )}
                    {/* COPIED THE CODE ABOVE */}
                  </View>
   
   
                ))
              }
            </View>
            {
              loading2 ? <ActivityIndicator size="large" color='#00FF7F' />
                :
                <Text style={formbtn}
                  onPress={() => createPost()}>
                  Add Post
                </Text>
            }
          </View>
        </View>
        <View></View>
      </ScrollView>
    )
   }
   export default AddPost
   const styles = StyleSheet.create({
    c1: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 5
    },
    addPost: {
      marginLeft: 60,
      fontSize: 15,
      fontWeight: '100',
      color: 'black',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 10,
      paddingVertical: 50,
      width: '60%',
      textAlign: 'center',
      marginVertical: 20
    },
    addDesc: {
      marginLeft: 30,
      fontSize: 15,
      fontWeight: '100',
      color: 'black',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 10,
      width: '80%',
      textAlign: 'center',
    },
    text1: {
      fontSize: 20,
      marginLeft: 10
    },
    profilePic: {
      width: 30,
      height: 30,
      borderRadius: 44 / 2,
      borderColor: '#00FF7F',
      borderWidth: 1
    },
    username: {
      marginLeft: 10,
      fontSize: 15,
      fontWeight: 'bold',
      color: '#000'
    },
    nft_image: {
      width: '100%',
      height: 300,
      borderRadius: 10,
    },
   })
   