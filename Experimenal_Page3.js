import React, { useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';


const Experimental_Page3 = () => {
 const isFlipped = useSharedValue(false);
 const pan = useRef(new Animated.Value(0)).current;


 const animatedStyle = useAnimatedStyle(() => {
   const rotateY = interpolate(pan.value, [-100, 100], [-180, 180]);
   return {
     transform: [{ rotateY }],
   };
 });


 const onGestureEvent = Animated.event(
   [
     {
       nativeEvent: {
         translationX: pan,
       },
     },
   ],
   { useNativeDriver: true }
 );


 return (
   <PanGestureHandler onGestureEvent={onGestureEvent}>
     <Animated.View style={[styles.card, animatedStyle]}>
       {/* Front content */}
       {/* Back content */}
     </Animated.View>
   </PanGestureHandler>
 );
};


const styles = StyleSheet.create({
 card: {
   // Card styling
 },
});


export default Experimental_Page3;