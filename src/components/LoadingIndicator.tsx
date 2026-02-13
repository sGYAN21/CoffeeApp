import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Image, Animated } from 'react-native';
import BOTTLE from '../assets/loading/bottle.png';
import LEMON from '../assets/loading/juice.png';
import BAR from '../assets/loading/bar.png';
import CUP from '../assets/loading/cup.png';


const IMAGES = [CUP, BOTTLE, LEMON, BAR];

interface LoadingIndicatorProps {
  size?: number;
  color?: string;
  speed?: number;
}

const LoadingIndicator = ({ 
  size = 60, 
  color = '#D4A373', 
  speed = 500 
}: LoadingIndicatorProps) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      // Smooth fade out/in transition
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: speed / 2,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: speed / 2,
          useNativeDriver: true,
        }),
      ]).start();

      setCurrentImgIndex((prev) => (prev + 1) % IMAGES.length);
    }, speed);

    return () => clearInterval(interval);
  }, [speed]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={IMAGES[currentImgIndex]}
        style={[
          styles.image,
          { width: size, height: size, tintColor: color, opacity: fadeAnim }
        ]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
  },
});

export default LoadingIndicator;