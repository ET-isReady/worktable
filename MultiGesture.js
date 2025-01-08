import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyComponent = () => {
  const [view1Position, setView1Position] = useState({ x: 0, y: 0 });
  const [view2Position, setView2Position] = useState({ x: 0, y: 0 });

  const handlePanGesture = (event, viewNumber) => {
    const { translationX, translationY } = event.nativeEvent;

    if (viewNumber === 1) {
      setView1Position({
        x: translationX,
        y: translationY,
      });
    } else if (viewNumber === 2) {
      setView2Position({
        x: translationX,
        y: translationY,
      });
    }
  };

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={(event) => handlePanGesture(event, 1)}>
        <Animated.View style={[styles.box, { transform: [{ translateX: view1Position.x }, { translateY: view1Position.y }] }]}>
          <Text>View 1</Text>
        </Animated.View>
      </PanGestureHandler>

      <PanGestureHandler onGestureEvent={(event) => handlePanGesture(event, 2)}>
        <Animated.View style={[styles.box, { transform: [{ translateX: view2Position.x }, { translateY: view2Position.y }] }]}>
          <Text>View 2</Text>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
});

export default MyComponent;