import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesom from 'react-native-vector-icons/FontAwesome'
import Antdesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import { icons1 } from '../CommonCss/pagecss'

  const BottomNavbar = ({navigation, page}: Props) => {

// console.log(page)
return (
  <View style={styles.container}>
  <StatusBar />

  {
    page === 'NotificationPage' ?
   
    <MaterialCommunityIcons name="webhook" color="#065535" style={styles.activeicons1}
        onPress={()=>navigation.navigate('NotificationPage')}
   
    />
    :
    <MaterialCommunityIcons name="webhook" style={icons1}
        onPress={()=>navigation.navigate('NotificationPage')}
    
    />
  
  }


  {/*}<FontAwesome name="bitcoin" style={icons1} />*/}


  {
    page === 'MainPage' ?
    <Entypo name="upload-to-cloud" color="#065535"  style={styles.activeicons1}
      onPress={()=>navigation.navigate('MainPage')}
    />
    :
    <Entypo name="upload-to-cloud"  style={icons1}
      onPress={()=>navigation.navigate('MainPage')}
    />
  }


  {
    page === 'SearchUserPage' ?
    <MaterialCommunityIcons name="cloud-search" color="#065535" style={styles.activeicons1}
      onPress={()=>navigation.navigate('SearchUserPage')}
    />
    :
    <MaterialCommunityIcons name="cloud-search" style={icons1}
      onPress={()=>navigation.navigate('SearchUserPage')}
    />
  }

  </View>
)
}

export default BottomNavbar

const styles = StyleSheet.create({
container: {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  position: 'absolute',
  bottom: 0,
  width: '100%',
  zIndex: 100,
  paddingVertical: 5,
  backgroundColor: '#00B900',
  opacity: .70,
  alignItems: 'center'
},
activeicons1: {
  backgroundColor: '#E5E5E5',
  borderRadius: 50,
  fontSize: 35,
  paddingHorizontal: 15
}
})