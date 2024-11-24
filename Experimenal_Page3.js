import React, { useRef } from 'react';
import { Animated, StyleSheet, View, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useSharedValue, useAnimatedStyle, interpolate, withTiming } from 'react-native-reanimated';


// Remember! GestureHandlerRootView is in App.js b/c the whole app  must be wrapped in it on Android devices!!


const Experimental_Page3 = ({ route }) => {
 const { item } = route.params;
 const translationX = new Animated.Value(0)
 const translationY = new Animated.Value(0)


 const animatedStyle = useAnimatedStyle(() => {
  
   return {
     transform: [{ }],
   };
 });


 const onGestureEvent = Animated.event(
   [{
     nativeEvent: {
       translationX: translationX,
       translationY: translationY,
     }
   }],
   { useNativeDriver: true }
 );


return (
<SafeAreaView style={{alignItems: 'center', justifyContent: 'center'}}>
     <View style={styles.pressable3}>
       <Text style={styles.text5}>{ item.id }</Text>
       <Text style={styles.text5}>{ item.image }</Text>     
     </View>
  <PanGestureHandler onGestureEvent={onGestureEvent}>
    <Animated.View style={[styles.pressable4,
     {
       transform: [
         {
           translateX: translationX,
         },
         {
           translateY: translationY,
         },
       ],
      }
    ]}>
       <Text style={styles.text5}>{ item.id }</Text>
       <Text style={styles.text5}>{ item.name }</Text>
    </Animated.View>
  </PanGestureHandler>
</SafeAreaView>
);
};


const styles = StyleSheet.create({
 pressable3: {
   backgroundColor: 'green',
   padding: 8,
   marginTop: 30,
   borderRadius: 3,
   width: 150,
   height: 150
 },
 pressable4: {
   backgroundColor: 'red',
   padding: 8,
   marginTop: 30,
   borderRadius: 3,
   width: 150,
   height: 150
 },
 text5: {
   color: 'white',
   fontWeight: 'bold'
}
});


export default Experimental_Page3;