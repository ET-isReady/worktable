import { StyleSheet, Text, View, SafeAreaView, Pressable, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import { URI } from '../../URI'
import { FlatList } from 'react-native-gesture-handler'

// I guess this is actually the newsfeed page ? maybe? 

const TagVenueScreen = ({ navigation }) => {
    const [ venues, setVenues ] = useState([])


    useEffect(() => {
        const fetchVenues = async () => {
          try {
            const response = await axios.get(`${URI}/venues`)
            setVenues(response.data);
          } catch (error) {
            console.error('Failed to fetch venues:', error);
          }
        };
    
        fetchVenues();
      }, []);
    
    //   console.log('venues', venues);
    const [ taggedVenue, setTaggedVenue ] = useState(null)

    useEffect(()=>{
        if(taggedVenue) {
            navigation.goBack({ taggedVenue })
        }
    }, [ taggedVenue, navigation ])

    const handleSelectVenue = (venue) => {
        navigation.navigate('AddPost', { taggedVenue: venue })
    }
  return (
    <SafeAreaView>
      <View>
        <Text>TagVenueScreen</Text>
      <Ionicons name='arrow-back' size={24} color='black' />
      </View>

      {/* Code below is for extracting data from the MongoDB database and displaying it on the page  */}

      <FlatList  data={ venues } renderItem={({ item }) => (
        <Pressable onPress={()=> handleSelectVenue( item?.name )}
        style={styles.pressable1}>
            <View>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <Image style={styles.image1} source={{ uri: item?.image }} />
                    <View>
                        <Text style={styles.text1} numberOfLines={1} ellipsizeMode='tail'>{item?.name}</Text>
                        <Text style={{ marginTop: 6, color: 'gray' }}>{ item?.address }</Text>
                        <Text style={styles.text2}>{ item?.rating }</Text>
                    </View>

                    <Ionicons name='shield-checkmark-sharp' size={24} color='green' />

                </View>
                <View style={{ marginTop: 5 }}>
                    <Text style={{ textAlign: 'center', color: 'gray' }}>BOOKABLE</Text>
                </View>
            </View>
        </Pressable>
      )}
      />
    </SafeAreaView>
  )
}

export default TagVenueScreen

const styles = StyleSheet.create({
    image1: {
        width: 90,
        height: 90,
        resizeMode: 'cover',
        borderRadius: 7
    },
    pressable1: {
        padding: 10,
        marginVertical: 10,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        marginHorizontal: 10
    },
    text1:{
        fontSize: 15,
        fontWeight: '500',
        width: '100%'
    }, 
    text2: {
        marginTop: 8,
        fontWeight: '500'
    }
})