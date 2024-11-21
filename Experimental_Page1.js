import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, Pressable, FlatList } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import IonIcons from 'react-native-vector-icons/Ionicons'
import VenueCard from '../../Components/VenueCard'
import AntDesign from 'react-native-vector-icons/AntDesign'




const Experimental_Page1 = ({ navigation }) => {


 const venues = [
   {
     id: '0',
     name: "DDSA - St.Joseph's Boys' High School (European)",
     address: 'Ashok Nagar',
     newImage:
       'https://images.pexels.com/photos/3660204/pexels-photo-3660204.jpeg?auto=compress&cs=tinysrgb&w=800',
     image:
       'https://playov2.gumlet.io/v3_homescreen/marketing_journey/Tennis%20Spotlight.png',
     location:
       'No. 27, Museum Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka',
     rating: 3.6,
     timings: '5.30 AM - 9:00 PM',
     sportsAvailable: [
       {
         id: '10',
         name: 'Badminton',
         icon: 'badminton',
         price: 500,
         courts: [
           {
             id: '10',
             name: 'Standard synthetic court 1',
           },
           {
             id: '11',
             name: 'Standard synthetic court 2',
           },
           {
             id: '12',
             name: 'Standard synthetic court 3',
           },
         ],
       },
       {
         id: '11',
         name: 'Cricket',
         icon: 'cricket',
         price: 1100,
         courts: [
           {
             id: '10',
             name: 'Full Pitch 1',
           },
           {
             id: '11',
             name: 'Full Pitch 2',
           },
         ],
       },
       {
         id: '12',
         name: 'Tennis',
         icon: 'tennis',
         price: 900,
         courts: [
           {
             id: '10',
             name: 'Court 1',
           },
           {
             id: '11',
             name: 'Court 2',
           },
         ],
       },
     ],
   },
   {
     id: '1',
     image:
       'https://playo.gumlet.io/PANCHAJANYABADMINTONFITNESSACADEMY/panchajanyabadmintonfitnessacademy1597334767773.jpeg?mode=crop&crop=smart&h=200&width=450&q=40&format=webp',
     name: 'Panchajanya Badminton & Fitness Academy',
     address: 'Kittur Rani Chennamma Stadium',
     location:
       'Gate 01, Kittur Rani Chennamma Stadium, Sports Complex, Jayanagar, Jayanagar East, Byrasandra, Jayanagar, Bengaluru, Karnataka - 560011',
     rating: 4.0,
     newImage:
       'https://images.pexels.com/photos/3660204/pexels-photo-3660204.jpeg?auto=compress&cs=tinysrgb&w=800',
     timings: '5 AM - 10 PM',
     sportsAvailable: [
       {
         id: '10',
         name: 'Badminton',
         icon: 'badminton',
         price: 500,
         courts: [
           {
             id: '10',
             name: 'Standard synthetic court 1',
           },
           {
             id: '11',
             name: 'Standard synthetic court 2',
           },
           {
             id: '12',
             name: 'Standard synthetic court 3',
           },
         ],
       },
       {
         id: '11',
         name: 'Cricket',
         icon: 'cricket',
         price: 1100,
         courts: [
           {
             id: '10',
             name: 'Full Pitch 1',
           },
           {
             id: '11',
             name: 'Full Pitch 2',
           },
         ],
       },
       {
         id: '12',
         name: 'Tennis',
         icon: 'tennis',
         price: 900,
         courts: [
           {
             id: '10',
             name: 'Court 1',
           },
           {
             id: '11',
             name: 'Court 2',
           },
         ],
       },
     ],
   },
   {
     id: '2',
     name: 'Sportexx',
     image:
       'https://playo.gumlet.io/SPORTEXX20220319100016960702/sportexx1647683524186.jpg?mode=crop&crop=smart&h=200&width=450&q=40&format=webp',
     address: 'Hebbal Kempapura',
     location: '#43/2, 3rd Cross, Sonnappa Layout, Bhuvaneshwari Nagar',
     rating: 4.1,
     newImage:
       'https://images.pexels.com/photos/3660204/pexels-photo-3660204.jpeg?auto=compress&cs=tinysrgb&w=800',
     timings: '5.30 AM - 9:00 PM',
     sportsAvailable: [
       {
         id: '10',
         name: 'Badminton',
         icon: 'badminton',
         price: 500,
         courts: [
           {
             id: '10',
             name: 'Standard synthetic court 1',
           },
           {
             id: '11',
             name: 'Standard synthetic court 2',
           },
           {
             id: '12',
             name: 'Standard synthetic court 3',
           },
         ],
       },
       {
         id: '11',
         name: 'Cricket',
         icon: 'cricket',
         price: 1100,
         courts: [
           {
             id: '10',
             name: 'Full Pitch 1',
           },
           {
             id: '11',
             name: 'Full Pitch 2',
           },
         ],
       },
     ],
   },
 ];


 return (
   <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5'}}>
     <View style={styles.container2}>
       <View style={styles.container1}>
           <Text>Experimental_Page1</Text>
           <MaterialIcons onPress={() => navigation.navigate('MainPage')}  name="keyboard-arrow-left" size={30} color="black" />
       </View>
       <View style={styles.container3}>
         <IonIcons name="chatbox-outline" size={24} color="black" />
         <IonIcons name="notifications-outline" size={24} color="black" />
         {/* <Image style={styles.image1}
         source={{ uri: 'https://media.istockphoto.com/id/613550954/vector/breaking-news-headline-newspaper-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=ZLyQEdx1Ynh1WRsr9Nx2ZIo_NC7TCIUS_yQ3_FwL3tE=' }}
         /> */}
         <Image style={styles.image1}
         source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
         />
       </View>
     </View>
     <View style={styles.container4}>
       <TextInput placeholder='Search for Venues' />
       <IonIcons name="search" size={24} color="black" />
     </View>
     <Pressable style={styles.pressable1}>


       <View style={styles.container5}>
         <Text>
           Sports & Availablility
         </Text>
       </View>


       <View style={styles.container5}>
         <Text>
           Favorites
         </Text>
       </View>


       <View style={styles.container5}>
         <Text>
           Offers
         </Text>
       </View>


     </Pressable>


     <FlatList data={venues} renderItem={({ item }) => <VenueCard item={ item } /> }
     contentContainerStyle={{ paddingBottom: 20}}
     showsVerticalScrollIndicator={false}
      />
      <AntDesign name="pluscircle" size={50} color="#FF80ED"
 style={styles.pluscircle} onPress={()=>navigation.navigate('Experimental_Page2')} />
   </SafeAreaView>
 )
}


export default Experimental_Page1


const styles = StyleSheet.create({
 container1: {
   flexDirection: 'row',
   alignItems: 'center',
   gap: 5
 },
 container2: {
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent:'space-between',
   padding: 12
 },
 container3: {
   flexDirection: 'row',
   alignItems: 'center',
   gap: 10
 },
 container4: {
   marginHorizontal: 12,
   backgroundColor: '#e8e8e8',
   padding: 10,
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'space-between',
   borderRadius: 25
 },
 container5: {
   padding: 10,
   borderRadius: 10,
   borderColor: '#e0e0e0',
   borderWidth: 1
 },
 image1: {
   width: 30,
   height: 30,
   borderRadius: 15
 },
 pressable1: {
   flexDirection: 'row',
   alignItems: 'center',
   gap: 10,
   padding: 13
 }
})
