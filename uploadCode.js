import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    Image,
    Pressable,
   } from 'react-native';
   import React from 'react';
   import {useRoute} from '@react-navigation/native';
   
   
   import Ionicons from 'react-native-vector-icons/Ionicons';
   import AntDesign from 'react-native-vector-icons/AntDesign';
   import FontAwesome from 'react-native-vector-icons/FontAwesome';
   import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
   import Amenities from '../components/Amenities';
   
   
   const VenueInfoScreen = () => {
    const route = useRoute();
    // console.log(route?.params)
   
   
    return (
      <>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <>
            <View>
              <Image
                style={styles.image1}
                source={{
                  uri: 'https://images.pexels.com/photos/3660204/pexels-photo-3660204.jpeg',
                }}
              />
            </View>
            {/* below is the Time and Location fonts */}
            <View style={{padding: 10}}>
            <Text style={styles.text6}>VenueInfoScreen</Text>
              <Text>{route?.params?.name}</Text>
              <View style={styles.container1}>
                <Ionicons name="time-outline" size={24} color="black" />
                <Text style={{fontSize: 15, fontWeight: '500'}}>
                  6:00 AM - 11:00 PM
                </Text>
              </View>
              <View style={styles.container2}>
                <Ionicons name="location-outline" size={24} color="black" />
                <Text style={styles.text1}>{route?.params?.location}</Text>
              </View>
            </View>
   
   
            {/* below is the rating counter */}
            <View style={styles.container3}>
              <View>
                <View style={{flexDirection: 'row'}}>
                  {[0, 0, 0, 0, 0].map((en, i) => (
                    <FontAwesome
                      style={{paddingHorizontal: 3}}
                      name={
                        i < Math.floor(route.params.rating) ? 'star' : 'star-o'
                      }
                      size={15}
                      color="#ffd700"
                    />
                  ))}
                  <Text>{route.params.rating} (9 ratings)</Text>
                </View>
                <Pressable style={styles.pressable1}>
                  <Text>Rate Venue</Text>
                </Pressable>
              </View>
   
   
              <View>
                <View>
                  <Text>100 Total Activities</Text>
                </View>
   
   
                <Pressable style={styles.pressable1}>
                  <Text>1 Upcoming</Text>
                </Pressable>
              </View>
            </View>
            {/* below is the sports available */}
            <Text style={styles.text2}>Sports Available</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {route.params?.sportsAvailable?.map((item, index) => (
                <View style={styles.container4}>
                  <MaterialCommunityIcons
                    style={{textAlign: 'center'}}
                    name={item.icon}
                    size={24}
                    color="gray"
                  />
                  <Text style={styles.text3}>{item?.name}</Text>
                </View>
              ))}
            </ScrollView>
            {/* below is the amenities card */}
            <Amenities />
            <View style={{marginHorizontal: 10}}>
              <Text style={styles.text4}>Activities</Text>
               {/* below is the Activity Button */}
              <Pressable style={styles.pressable2}>
                <AntDesign name="plus" size={24} color="black" />
                <Text>Create Activity</Text>
              </Pressable>
            </View>
          </>
        </ScrollView>
      </SafeAreaView>
      <Pressable style={styles.pressable3}>
          <Text style={styles.text5}>Book Now</Text>
      </Pressable>
      </>
    );
   };
   
   
   export default VenueInfoScreen;
   
   
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
      backgroundColor: 'green',
      padding: 8,
      marginBottom: 30,
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



   