import { Platform } from 'react-native'


let URI = ''


if(Platform.OS === 'ios'){
   URI = 'http://localhost:3000/api/v1'
} else{
   URI = 'http://10.0.2.2:3000/api/v1'
}


export { URI }



   