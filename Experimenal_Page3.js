import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, ViewStyle, Pressable, Text, SafeAreaView, Button, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate, Extrapolation } from 'react-native-reanimated';
// import FlipCard from 'react-native-flip-card'
// import BackgroundImage from '../../Components/BackgroundImage';




// Remember! GestureHandlerRootView is in App.js b/c the whole app  must be wrapped in it on Android devices!!
import { useNavigation } from '@react-navigation/native'


const { height: SCREEN_HEIGHT } = Dimensions.get('window')


const Experimental_Page3 = ({ route }) => {
const { item } = route.params;
const navigation = useNavigation()


const Point2D = {
x: 0,
y: 0
}




const transformOriginWorklet = (
anchorPoint = Point2D,
originalCenterPoint = Point2D,
transforms,
) => {
'worklet';
const result = [
  {translateX: anchorPoint.x - originalCenterPoint.x},
  {translateY: anchorPoint.y - originalCenterPoint.y},
  ...transforms,
  {translateX: -(anchorPoint.x - originalCenterPoint.x)},
  {translateY: -(anchorPoint.y - originalCenterPoint.y)},
];
return result;
};




const rotation1 = useSharedValue(0)


//  const animatedValue = useSharedValue(0);
const isFlipping = useSharedValue(false)
const squareSize = 100;




// Top half of the page begins here




const animatedStyle1 = useAnimatedStyle(()=>{
return{
  transform: [
    {perspective: 2000},
    ...transformOriginWorklet(
      // { x: 0, y: 0 },
      { x: squareSize / .45 , y: squareSize / .45 },
      { x: squareSize / 2, y:  squareSize / 2 },
      [{ rotateX: `${rotation1.value}deg` }],
    ),
  ],
}
})




const onGestureEvent1 = ( event, viewNumber ) =>{


const { translationY } = event.nativeEvent


 if(!isFlipping.value) {
  rotation1.value = withTiming(translationY / -2, { duration: 0 })
}




if( event.nativeEvent.state === 5 ){
  isFlipping.value = true
  if (rotation1.value > 90 ) {
    rotation1.value = withSpring(180)
  } else{
    rotation1.value = withSpring(0)
  }
  isFlipping.value = false
}
if(event.nativeEvent.translationY > 180) {
 navigation.navigate('Experimental_Page2', { item })
}
}


// Bottom half of the page begins here


const rotation2 = useSharedValue(1)


const animatedStyle2 = useAnimatedStyle(()=>{


return{
  transform: [
    {perspective: 2000},
    ...transformOriginWorklet(
      // { x: 0, y: 0 },
      { x: squareSize / -.45 , y: squareSize / -.45 },
      { x: squareSize / -2, y:  squareSize / -2 },
      [{ rotateX: `${rotation2.value}deg` }],
    )
  ],
}
})




const onGestureEvent2 = ( event ) =>{
  const { translationY } = event.nativeEvent
 if(!isFlipping.value) {
  rotation2.value = withTiming(translationY / -2, { duration: 0 })
}
if(event.nativeEvent.state === 5 ){
  isFlipping.value = true
  if (rotation2.value > 90 ) {
    rotation2.value = withSpring(180)
  } else{
    rotation2.value = withSpring(0)
  }
  isFlipping.value = false
}
if(event.nativeEvent.translationY < -180) {
  navigation.navigate('Experimental_Page2', { item })
}
}




return(
<View style={styles.container5}>




<PanGestureHandler onGestureEvent={onGestureEvent1}  >
<Animated.View style={[ styles.topHalf, animatedStyle1 ]}>
<Text style={styles.text5}>{ item.id }</Text>
<Text style={styles.text5}>{ item.name }</Text>
</Animated.View>
</PanGestureHandler>




<PanGestureHandler onGestureEvent={onGestureEvent2} >
<Animated.View style={[ styles.bottomHalf, animatedStyle2 ]}>
<Text style={styles.text5}>{ item.id }</Text>
<Text style={styles.text5}>{ item.rating }</Text>
</Animated.View>
</PanGestureHandler>




</View>
)








};








const styles = StyleSheet.create({
screen: {
  justifyContent: 'flex-start',
  alignItems: 'center',
  flex: 1,
  backgroundColor: '#fff',
},
squareContainer: {
  height: 100,
  width: 100,
  backgroundColor: '#0A0'
},
container1: {
 flex: 1,
 alignItems: 'center',
 justifyContent: 'center'
},
pressable3: {
backgroundColor: 'green',
padding: 8,
// marginTop: 30,
borderRadius: 3,
width: 100,
height: 100,
// ...StyleSheet.absoluteFillObject,
// width: undefined,
// height: undefined,
// resizeMode: "cover",
},
pressable4: {
backgroundColor: 'red',
padding: 8,
marginTop: 30,
borderRadius: 3,
// width: 150,
// height: 150,
...StyleSheet.absoluteFillObject,
width: undefined,
height: undefined,
resizeMode: "cover",
},
container5: {
flex: 1
},
text5: {
 color: 'white',
 fontWeight: 'bold'
},
topHalf: {
flex: 1,
backgroundColor: 'blue',
height: 200
},
bottomHalf: {
flex: 1,
backgroundColor: 'yellow',
height: 200
}
});

export default Experimental_Page3;