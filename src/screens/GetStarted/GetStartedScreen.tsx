import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import background from '../../assets/getstarted/background.jpg'
import { theme } from '../../constants';
const { width, height } = Dimensions.get('window');

const GetStartedScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <ImageBackground
        source={background} 
        style={styles.background}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.overlay}>
          <View style={styles.contentContainer}>
            {/* Title Section */}
            <View style={styles.textSection}>
              <Text style={styles.title}>Coffee Paglu</Text>
              <Text style={styles.subTitle}>From sunrise coffee ☕to midnight mojitos 🍸</Text>
            </View>

            {/* Button Section */}
            <TouchableOpacity 
              style={styles.button}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('signup')}
            >
              <Text style={styles.buttonText}>Get started</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: width,
    height: height*1.1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  contentContainer: {
    marginTop: height * 0.1, 
  },
  textSection: {
    marginBottom: 40,
  },
  title: {
    fontSize: 55,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: 70,
  },
  subTitle:{
    marginTop:10,
    fontSize: 20,
    fontWeight: '400',
    color:'#FFFFFF',
    lineHeight: 30,
    textAlign:'center'
  },
  button: {
    backgroundColor: theme.primary,
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 30,
    alignSelf: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default GetStartedScreen;