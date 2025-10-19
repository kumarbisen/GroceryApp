import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import ProductSlider from '@components/login/ProductSlider';
import CustomText from '@components/ui/CustomText';
import { Colors, Fonts, lightColors } from '@utils/Constants';
import { resetAndNavigate } from '@utils/NavigationUtils';
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Alert, Animated, Image, Keyboard, Platform, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { LinearGradient } from 'react-native-linear-gradient';
import CustomInput from '@components/ui/CustomInput';
import CustomButton from '@components/ui/CustomButton';
import { customerLogin } from '@service/authService';
import Icon from 'react-native-vector-icons/MaterialIcons'
import DeliveryLogin from './DeliveryLogin';

const CustomerLogin: FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [gestureSequence, setGestureSequence] = useState<string[]>([]);
  const keyboardOffsetHeight = useKeyboardOffsetHeight();

  const bottomColors = [...lightColors].reverse();

  useEffect(() => {
    if (keyboardOffsetHeight === 0) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: -keyboardOffsetHeight * 0.84,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [keyboardOffsetHeight]);

  const handleGesture = ({ nativeEvent }: any) => {
    if (nativeEvent.state === State.END) {
      const { translationX, translationY } = nativeEvent;
      let direction = '';
      if (Math.abs(translationX) > Math.abs(translationY)) {
        direction = translationX > 0 ? 'right' : 'left';
      } else {
        direction = translationY > 0 ? 'down' : 'up';
      }

      const newSequence = [...gestureSequence, direction].slice(-5);
      setGestureSequence(newSequence);

      if (newSequence?.join(' ') === 'up up down right') {
        setGestureSequence([]);
        resetAndNavigate('DeliveryLogin');
      }
    }
  };

  const handleAuth=async()=>{
      Keyboard.dismiss()
      setLoading(true)
      try {
        await customerLogin(phoneNumber)
        resetAndNavigate('ProductDashboard')
            
      } catch (error) {
        Alert.alert("Login Failed")
      }finally{
        setLoading(false)
      }

  }
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <CustomSafeAreaView>
          <ProductSlider />
          <PanGestureHandler onHandlerStateChange={handleGesture}>
            <Animated.ScrollView
              bounces={false}
              style={{transform:[{translateY:animatedValue}]}}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.subContainer}
            >
              <LinearGradient colors={bottomColors} style={styles.gradient} />
              <View style={styles.content}>
                <Image
                  source={require('@assets/images/logo.jpeg')}
                  style={styles.logo}
                />
                <CustomText varient="h2" fontFamily={Fonts.Bold}>
                  Grocery Delivery App
                </CustomText>
                <CustomText
                  varient="h5"
                  fontFamily={Fonts.SemiBold}
                  style={styles.text}
                >
                  Log in or sign up
                </CustomText>
                <CustomInput
                  onChangeText={text => setPhoneNumber(text.slice(0, 10))}
                  onClear={() => setPhoneNumber('')}
                  value={phoneNumber}
                  placeholder="  ENTER MOBILE NUMBER"
                  inputMode="numeric"
                  left={
                    <CustomText
                      style={styles.phoneText}
                      varient="h6"
                      fontFamily={Fonts.SemiBold}
                    >
                      + 91 
                    </CustomText>
                  }
                />

                <CustomButton 
                disabled={phoneNumber?.length !=10}
                onPress={()=>handleAuth()}
                loading={loading}
                title='Continue'
                />
              </View>
            </Animated.ScrollView>
          </PanGestureHandler>
        </CustomSafeAreaView>
        <View style={styles.footer}>
          <SafeAreaView />
          <CustomText fontSize={RFValue(10)}>
            By Continuing you agree to our Terms of Service & Privacy
          </CustomText>
          <SafeAreaView />
        </View>

        <TouchableOpacity style={styles.absoluteSwitch} onPress={() => resetAndNavigate("DeliveryLogin")}>
          <Icon name='directions-bike' color="#000" size={RFValue(20)}/>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
};
export default CustomerLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  phoneText: {
    marginLeft: 10,
  
  },
  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8,
  },
  subContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  footer: {
    borderTopWidth: 0.8,
    borderColor: Colors.border,
    paddingBottom: 10,
    zIndex: 22,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f9fc',
    width: '100%',
  },
  absoluteSwitch:{
      position:'absolute',
      top:Platform.OS ==='ios' ? 40 : 20,
      zIndex:99,
      backgroundColor:"#fff",
      shadowColor:"#000",
      shadowOffset:{width:1,height:1},
      shadowRadius:12,
      elevation:10,
      borderRadius:50,
      height:60,
      width:60,
      justifyContent:"center",
      alignItems:"center",
      padding:10,
      right:10

  },
  gradient: {
    paddingTop: 60,
    width: '100%',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  logo: {
    height: 50,
    width: 50,
    borderRadius: 20,
    marginVertical: 10,
  },
});
