import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const Post_Big_Card = (
{
username,
nft_image,
profile_pic,
likes,
title,
}
)=>{

//console.log(comments)

const [isLiked, setIsLiked] = useState(false)
const [showTitle, setShowTitle] = useState(false)

return(
  <View style={styles.container}>
    <View style={styles.c1}>
    <Image source={{ uri: profile_pic }} style={styles.profilepic} />
      <Text style={styles.username}>{username}</Text>
    </View>
    <Image source={{ uri: nft_image }} style={styles.nft_image}/>
    <View style={styles.cardBottom}>
    {
      isLiked ?
      <View style={styles.isLiked}>
      <MaterialCommunityIcons name="trophy" size={26} color="#FFD700" onPress={()=>{
        setIsLiked(false)
      }}/>
      <Text style={styles.likeCount}>{likes.length + 1}</Text>
      <View style={styles.s22}>
        {/*<MaterialCommunityIcons name="target-account" size={24} color="purple" onPress={
          ()=>{
            setShowTitle(!showTitle)
          }
        } />*/}
        <FontAwesome name="bitcoin" size={24} color="#329932" onPress={
          ()=>{
            setShowTitle(!showTitle)
          }
        } />
        {
          showTitle == true &&
          <View style={styles.title}>
            {
              title.map((item, index)=>{
                return(
                  <View style={styles.movement} key={item.id}>
                    <Text>Title: {item.title}</Text>
                    <Text>Desc: {item.desc}</Text>
                  </View>
                )
              })
            }
          </View>
        }
      </View>
      </View>
       :
      <View style={styles.notLiked}>
      <MaterialCommunityIcons style={{paddingVertical: 5}} name="trophy-broken" size={20} color="#D4aF37" onPress={()=>{
        setIsLiked(true)
      }} />
      {/*<Text style={styles.likeCount}>{likes.length}</Text>*/}
      <View style={styles.s22}>
        {/*<MaterialCommunityIcons name="target-account" size={24} color="purple"
        onPress={
          ()=>{
            setShowTitle(!showTitle)
          }
        } />*/}
        <FontAwesome name="bitcoin" size={24} color="#329932" onPress={
          ()=>{
            setShowTitle(!showTitle)
          }
        }/>
        {
          showTitle == true &&
          <View style={styles.title}>
            {
              title.map((item, index)=>{
                return(
                  <View style={styles.movement} key={item.id}>
                  <Text style={{padding: 2}}>NFT Info</Text>
                    <Text>Title: {item.title}</Text>
                    <Text>Desc: {item.desc}</Text>
                  </View>
                )
              })
            }
          </View>
        }
      </View>
      </View>
    }
    </View>
  </View>
)
}


export default Post_Big_Card

const styles = StyleSheet.create({
container: {
  width: "100%",
  height: 580,
  backgroundColor: 'white',
  borderRadius: 10,
  marginVertical: 10,
  padding: 10
},
c1: {
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  padding: 5
},
profilepic: {
  width: 30,
  height: 30,
  borderRadius: 44/2,
  borderColor: 'red',
  borderWidth: 1
},
username: {
  marginLeft: 10,
  fontSize: 15,
  fontWeight: 'bold'
},
nft_image: {
  width: '100%',
  height: '88%',
  //aspectRatio: 1,
  borderRadius: 10
},
cardBottom: {
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center'
},
notLiked: {
  marginTop: 3,
  flexDirection: 'row'
},
isLiked: {
  width: '100%',
  flexDirection: 'row'
},
likeCount: {
  marginLeft: 5,
  color: 'green',
  fontWeight: 'bold',
  fontSize: 16
},
s22: {
  marginLeft: 20,
  flexDirection: 'row'
},
title: {
  width: '100%',
  marginLeft: 10,
  flexDirection: 'row',
  paddingVertical: 5
},
movement: {
  zIndex: 100,
  width: '70%',
  //marginTop: -50,
  backgroundColor: '#fff',
  borderRadius: 5,
  padding: 10,
  marginVertical: -100,
  position: 'absolute'
}


})