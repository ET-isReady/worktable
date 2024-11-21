import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'


const VenueCard = ({ item }) => {
 return (
   <View style={{ margin: 15 }}>
     <Pressable style={styles.pressable1}>
       <View>
           <Image style={styles.image1} source={{ uri: item?.image }} />
       </View>
       <View style={styles.container2}>
           <View style={styles.container3}>
               <Text>{ item?.name.length > 40
               ?
               item?.name?.substring(0, 40) + '...'
               :
               item?.name }
               </Text>
               <View style={styles.container1}>
                   <AntDesign name='star' size={20} color='white' />
                   <Text style={styles.text1}>{ item?.rating }</Text>
               </View>
           </View>
           <Text>{ item?.address.length > 40
               ?
               item?.address?.substring(0, 40) + '...'
               :
               item?.address }
           </Text>
           <View style={styles.container4} />
           <View style={styles.container5}>
               <Text>Up to 10% Off</Text>


               <Text>INR 25 Onwards</Text>
           </View>
       </View>
     </Pressable>
   </View>
 )
}


export default VenueCard


const styles = StyleSheet.create({
   container1: {
       flexDirection: 'row',
       alignItems: 'center',
       gap: 6,
       backgroundColor: 'green',
       padding: 6,
       borderRadius: 5,
   },
   container2: {
       paddingVertical: 12,
       paddingHorizontal: 10
   },
   container3: {
       flexDirection: 'row',
       justifyContent:'space-between',
       alignItems: 'center',
       marginRight: 1
   },
   container4: {
       height: 1,
       borderWidth: 0.6,
       borderColor: '#E0E0E0',
       marginVertical: 10,
   },
   container5: {
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'space-between',
       margin: 1
   },
   image1: {
       width: '100%',
       height: 200,
       borderTopLeftRadius: 10,
       borderTopRightRadius: 10
   },
   pressable1: {
       backgroundColor: 'white',
       borderRadius: 5,
       borderTopLeftRadius: 10,
       borderTopRightRadius: 10
   },
   text1: {
       color: 'white',
       fontWeight: 'bold'
   }
})
