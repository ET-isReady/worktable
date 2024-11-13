import {useEffect, useState} from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Login from '../src/screens/LoginSignup/Login/Login'
import Signup_EnterEmail from '../src/screens/LoginSignup/Signup/Signup_EnterEmail'
import Signup_EnterVerificationCode from '../src/screens/LoginSignup/Signup/Signup_EnterVerificationCode'
import Signup_ChooseUsername from '../src/screens/LoginSignup/Signup/Signup_ChooseUsername'
import Signup_ChoosePassword from '../src/screens/LoginSignup/Signup/Signup_ChoosePassword'
import Signup_AccountCreated from '../src/screens/LoginSignup/Signup/Signup_AccountCreated'
import MainPage from '../src/screens/MainPage/Mainpage'
import AddPost from '../src/screens/MainPage/AddPost'
import My_UserProfile from '../src/screens/Profile/My_UserProfile'
import Settings from '../src/screens/Settings/Settings'
import EditProfile from '../src/screens/Settings/EditProfile'
import UploadProfilePic from '../src/screens/Settings/UploadProfilePic'
import ChangeUsername from '../src/screens/Settings/ChangeUsername'
import ChangeUserHeader from '../src/screens/Settings/ChangeUserHeader'
import ChangePassword from '../src/screens/Settings/ChangePassword'
import Other_UserProfile from '../src/screens/Profile/Other_UserProfile'
import SearchUserPage from '../src/screens/MainPage/SearchUserPage'
import NotificationPage from '../src/screens/MainPage/NotificationPage'
import All_Chats from '../src/screens/ChatSection/All_Chats'
import MessagePage from '../src/screens/ChatSection/MessagePage'


const Main = () => {
 const Stack = createNativeStackNavigator()


 return (
   <Stack.Navigator
     initialRouteName="Login"
     screenOptions={{
       headerShown: false,
     }}>
     <Stack.Screen name="Login" component={Login} />
     <Stack.Screen name="Signup_EnterEmail" component={Signup_EnterEmail} />
     <Stack.Screen name="Signup_EnterVerificationCode" component={Signup_EnterVerificationCode} />
     <Stack.Screen name="Signup_ChooseUsername" component={Signup_ChooseUsername} />
     <Stack.Screen name="Signup_ChoosePassword" component={Signup_ChoosePassword} />
     <Stack.Screen name="Signup_AccountCreated" component={Signup_AccountCreated} />
     <Stack.Screen name="MainPage" component={MainPage} />
     <Stack.Screen name="AddPost" component={AddPost} />
     <Stack.Screen name ="All_Chats" component={All_Chats}
        options={{
          animation: 'slide_from_right'
        }}
       />
     <Stack.Screen name ="My_UserProfile" component={My_UserProfile}
         options={{
           animation: 'slide_from_left'
         }} />
     <Stack.Screen name="Settings" component={Settings} />
     <Stack.Screen name="EditProfile" component={EditProfile} />
     <Stack.Screen name="UploadProfilePic" component={UploadProfilePic} />
     <Stack.Screen name="ChangeUsername" component={ChangeUsername} />
     <Stack.Screen name="ChangeUserHeader" component={ChangeUserHeader} />
     <Stack.Screen name="ChangePassword" component={ChangePassword} />
     <Stack.Screen name ="Other_UserProfile" component={Other_UserProfile} />
     <Stack.Screen name ="SearchUserPage" component={SearchUserPage}
        options={{
          animation: 'slide_from_bottom'
        }}
      />
      <Stack.Screen name ="MessagePage" component={MessagePage} />
      <Stack.Screen name ="NotificationPage" component={NotificationPage} />
   </Stack.Navigator>
 );
};


export default Main;