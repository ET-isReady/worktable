import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { formHead, formHead2, formHead3 } from '../../CommonCss/formcss';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfile = ({ navigation }) => {

  return (
      <View style={styles.container}>


           <Ionicons name="arrow-undo-circle" size={40} color="black"
           onPress={
               ()=>navigation.navigate('Settings')
           }
           />
         
          <Text style={formHead}>Edit Profile</Text>

          <Text style={styles.txt1}
              onPress={() => navigation.navigate('UploadProfilePic')}
          >Update Profile Picture</Text>
          <Text style={styles.txt1}
              onPress={() => navigation.navigate('ChangeUsername')}
          >Change Username</Text>
          <Text style={styles.txt1}
              onPress={() => navigation.navigate('ChangeUserHeader')}
          >Update Profile Header</Text>

      </View>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  container: {
      width: '100%',
      height: '100%',
      backgroundColor: 'white'
  },
  txt1: {
      marginTop: 20,
      color: 'black',
      fontSize: 20,
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
  }
})