import { useState, useEffect, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode'
import 'core-js/stable/atob'


const AuthContext = createContext()


const AuthProvider = ({ children })=>{
   const [ token, setToken ] = useState('')
   const [ userId, setUserId ] = useState('')


   const [ upcomingGames, setUpComingGames ] = useState('')


   const isLoggedIn = async () =>{
       try {
           const userToken = await AsyncStorage.getItem('token')
           setToken(userToken)
       } catch(error){
           console.log('error', error)
       }
   }


   useEffect(()=>{
       const fetchUser = async () => {
           const token = await AsyncStorage.getItem('token')
           const decodedToken = jwtDecode(token)
           const userId = decodedToken.userId
           setUserId(userId)
       }
       fetchUser()
   }, [])


   useEffect(()=>{
       isLoggedIn()
   }, [])


   return(
       <AuthContext.Provider value={{ token, setToken, userId, setUserId, upcomingGames, setUpComingGames }}>
           { children }
       </AuthContext.Provider>
   )
}


export { AuthContext, AuthProvider }