import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import { deliveryLogin } from '@service/authService';
import { resetAndNavigate } from '@utils/NavigationUtils';
import { screenHeight } from '@utils/Scaling';
import React, { FC, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import {
  GestureHandlerRootView,
  ScrollView,
} from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomText from '@components/ui/CustomText';
import { Fonts } from '@utils/Constants';
import CustomInput from '@components/ui/CustomInput';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomButton from '@components/ui/CustomButton';

// To use TypeScript we convert normal function to FC
const DeliveryLogin: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await deliveryLogin(email, password);
      resetAndNavigate('DeliveryDashboard');
    } catch (error) {
      Alert.alert('Login Failed');
    } finally {
      setLoading(false);
    }
  };
  return (
    <GestureHandlerRootView>
      <CustomSafeAreaView>
        <ScrollView
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <View style={styles.lottieContiner}>
              <LottieView
                autoPlay
                loop
                style={styles.lottie}
                hardwareAccelerationAndroid
                source={require('@assets/animations/delivery_man.json')}
              />
            </View>
            <CustomText varient="h3" fontFamily={Fonts.Bold}>
              Delivery Partner Portal
            </CustomText>
            <CustomText varient="h6" fontFamily={Fonts.SemiBold}>
              Faster than Flash⚡
            </CustomText>

            <CustomInput
              onChangeText={setEmail}
              value={email}
              left={
                <Icon
                  name="mail"
                  color="#F8890E"
                  style={{ marginLeft: 10 }}
                  size={RFValue(18)}
                />
              }
              placeholder="Email"
              inputMode="email"
              right={false}
            />

            <CustomInput
              onChangeText={setPassword}
              value={password}
              left={
                <Icon
                  name="key-sharp"
                  color="#F8890E"
                  style={{ marginLeft: 10 }}
                  size={RFValue(18)}
                />
              }
              placeholder="Password"
              secureTextEntry
              right={false}
            />

            <CustomButton
              disabled={email.length == 0 || password.length < 8}
              title="Login"
              onPress={handleLogin}
              loading={loading}
            />
          </View>
        </ScrollView>
      </CustomSafeAreaView>
    </GestureHandlerRootView>
  );
};
export default DeliveryLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  lottie: {
    height: '100%',
    width: '100%',
  },
  lottieContiner: {
    height: screenHeight * 0.12,
    width: '100%',
  },
  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8,
  },
});
