import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'
//    import Amenities from '../components/Amenities';
const Experimental_Page2 = ( { route } ) => {
 const navigation = useNavigation()
 const { item } = route.params;
 // const route = useRoute();
 // console.log(route?.params)
 return (
 <TouchableOpacity onPress={() => navigation.navigate('Experimental_Page1', { item })}>
     <View style={styles.pressable3}>
       <Text style={styles.text5}>{ item.id }</Text>
       <Text style={styles.text5}>{ item.image }</Text>
       <Image style={styles.image1} source={{ uri: item?.image }} />
     </View>
     <View style={styles.pressable4}>
       <Text style={styles.text5}>{ item.id }</Text>
       <Text style={styles.text5}>{ item.name }</Text>
       <Image style={styles.image1} source={{ uri: item?.image }} />
     </View>
 </TouchableOpacity>
 );
};
export default Experimental_Page2;
const styles = StyleSheet.create({
 image1: {
   width: '100%',
   height: 200,
   resizeMode: 'cover',
 },
 container1: {
   flexDirection: 'row',
   alignItems: 'center',
   marginTop: 5,
   gap: 5,
 },
 container2: {
   flexDirection: 'row',
   marginVertical: 8,
   gap: 5,
 },
 container3: {
   padding: 10,
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'space-around',
 },
 container4: {
   borderColor: '#686868',
   margin: 10,
   padding: 20,
   width: 130,
   height: 90,
   borderWidth: 1,
   borderRadius: 5,
 },
 image1: {
     width: '100%',
     height: 200,
     borderTopLeftRadius: 10,
     borderTopRightRadius: 10
 },
 pressable1: {
   borderColor: '#686868',
   width: 160,
   borderWidth: 1,
   borderRadius: 5,
   justifyContent: 'center',
   alignItems: 'center',
   padding: 10,
   marginTop: 6,
 },
 pressable2: {
   borderColor: '#787878',
   marginTop: 10,
   borderWidth: 1,
   padding: 10,
   justifyContent: 'center',
   flexDirection: 'row',
   alignItems: 'center',
   gap: 10,
   borderRadius: 5,
 },
 pressable3: {
   backgroundColor: 'purple',
   padding: 8,
   marginTop: 30,
   borderRadius: 3,
   marginHorizontal: 15
 },
 text1: {
   fontSize: 14,
   width: '80%',
   fontWeight: '500',
 },
 text2: {
   fontSize: 15,
   fontWeight: '500',
   marginHorizontal: 10,
 },
 text3: {
   fontSize: 13,
   fontWeight: 'bold',
   textAlign: 'center',
   marginTop: 10,
 },
 text4: {
   fontSize: 15,
   fontWeight: 'bold',
 },
 text5: {
   textAlign: 'center',
   fontWeight: 'bold',
   color: 'white'
 },
 text6: {
   fontSize: 20,
   fontWeight: 'bold',
 }
});
