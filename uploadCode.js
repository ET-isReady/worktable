import { StyleSheet, Text, View, StatusBar, TextInput, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { containerFull, logo1, hr80, mainpageFull, searchBar } from '../../CommonCss/pagecss'
import BottomNavbar from '../../Components/BottomNavbar'
import TopNavbar from '../../Components/TopNavbar'
import UsersCard from '../../Cards/UsersCard'


const SearchUserPage = ({ navigation }) => {


  const [keyword, setKeyword] = useState("")
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [error, setError] = useState(null)

  const getallusers = async () => {
      if (keyword.length > 0) {
          setLoading(true)
          fetch('http://10.0.2.2:3000/searchuser', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ keyword: keyword })
          })
              .then(res => res.json())
              .then(data => {
                
                  if (data.error) {
                      setData([])
                      setError(data.error)
                      setLoading(false)
                  }
                  else if (data.message == 'User Found') {
                      setError(null)
                      setData(data.user)
                      setLoading(false)
                  }
              })
              .catch(err => {
                  setData([])
                  setLoading(false)
              })
      }
      else {
          setData([])
          setError(null)
      }
  }

  useEffect(() => {
      getallusers()
  }, [keyword])

return (
  <View style={styles.container}>
  <StatusBar />
  <TopNavbar navigation = {navigation} />
  <BottomNavbar navigation={navigation} page={"SearchUserPage"} />

  <TextInput style={searchBar} placeholder="Search Stars or Sellers" onChangeText={(text)=>{
      setKeyword(text)
  }} />
  {
    loading ?
    <ActivityIndicator size="large" color='#00FF7F' />
    :
    <>
    {
      error ?
    <Text style={{ color: 'black' }}>{error}</Text>
      :
      //use code below for upper corner small profile image
    <ScrollView style={styles.userLists}>
    {
      data.map((item, index)=>{
        return <UsersCard key={item.username} user={item}
        navigation={navigation}
        />
      })
    }
    </ScrollView>
    }
    </>
  }
  </View>
)
}

export default SearchUserPage

const styles = StyleSheet.create({
container: {
width: '100%',
height: '100%',
paddingVertical: 50
},
userLists: {
  width: '100%',
  marginTop: 20
}
})


   