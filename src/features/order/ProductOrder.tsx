import CustomHeader from '@components/ui/CustomHeader';
import { Colors, Fonts } from '@utils/Constants';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import OrderList from './OrderList';
import CustomText from '@components/ui/CustomText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import BillDetails from './BillDetails';
import { useCartStore } from '@state/cartStore';
import { useAuthStore } from '@state/authStore';
import { hocStyles } from '@styles/GlobalStyles';
import ArrowButton from '@components/ui/ArrowButton';
import { create } from 'zustand';
import { createOrder } from '@service/OrderService';
import { navigate } from '@utils/NavigationUtils';

const ProductOrder = () => {
  const { getTotalPrice, cart, clearCart } = useCartStore();
  // console.log(cart);
  
  const { user, setCurrentOrder, currentOrder } = useAuthStore();
//   console.log('User:', user);
//     console.log('User address:', user?.address);
  const totalItemPrice = getTotalPrice();
  const [loading, setLoading] = useState(false);
  const handlePlaceOrder = async () => {

    if(currentOrder !== null){
      Alert.alert("Let your first order to be delivered")
      return
    }
    const formattedData = cart.map(item => ({
      id:item._id,
      item:item.item,
      count:item.count
    }))

    if(formattedData.length ==0){
      Alert.alert("Add any items to place order")
      return
    }

    setLoading(true)
    const data = await createOrder(formattedData,totalItemPrice)
    //  yaha data != karna hai abhi data update nahi hua hai
    // Customer ka order database me update nahi ho raha
    if (data == null ){
      setCurrentOrder(data)
      clearCart()
      navigate('OrderSuccess',{...data})
      
      
    }else{
      Alert.alert("There was an error")
    }
    setLoading(false)
  };
  return (
    <View style={styles.container}>
      <CustomHeader title="CheckOut" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <OrderList />
        <View style={styles.flexRowBetween}>
          <View style={styles.flexRow}>
            <Image
              source={require('@assets/icons/coupon.png')}
              style={{ width: 25, height: 25 }}
            />
            <CustomText varient="h6" fontFamily={Fonts.SemiBold}>
              Use Coupons
            </CustomText>
          </View>
          <Icon name="chevron-right" size={RFValue(16)} color={Colors.text} />
        </View>

        <BillDetails totalItemPrice={totalItemPrice} />
        <View style={styles.flexRowBetween}>
          <View>
            <CustomText varient="h8" fontFamily={Fonts.SemiBold}>
              Cancellation Policy
            </CustomText>
            <CustomText
              varient="h9"
              style={styles.cancelText}
              fontFamily={Fonts.SemiBold}
            >
              Orders cannot be cancelled once packed for delivery, In case of
              unepected delays, refund will be provided , if applicable
            </CustomText>
          </View>
        </View>
      </ScrollView>

      <View style={hocStyles.cartContainer}>
        <View style={styles.absoluteContainer}>
          <View style={styles.addressContainer}>
            <View style={styles.flexRow}>
              <Image
                source={require('@assets/icons/home.png')}
                style={{ height: 20, width: 20 }}
              />

              <View style={{ width: '75%' }}>
                <CustomText varient="h8" fontFamily={Fonts.Medium}>
                  Delivering to Home
                </CustomText>
                <CustomText
                  varient="h9"
                  numberOfLines={2}
                  style={{ opacity: 0.6 }}>
                  {user?.address}
                                  
                </CustomText>
              </View>
            </View>
            <TouchableOpacity>
                <CustomText
                varient='h8'
                style={{color:Colors.secondary}}
                fontFamily={Fonts.Medium}>
                    Change  
                </CustomText>
            </TouchableOpacity>
          </View>
          <View style={styles.paymentGateway}>
            <View style={{width:'30%'}}>
                <CustomText fontFamily={Fonts.Regular} fontSize={RFValue(6)}>
                    PAY USING
                </CustomText>
                <CustomText
                fontFamily={Fonts.Regular}
                varient='h9'
                style={{marginTop:2}}
                >
                    Cash on Delivery
                </CustomText>
            </View>
            <View style={{width:'70%'}}>
                <ArrowButton
                loading={loading}
                price={totalItemPrice}
                title='place Order'
                onPress = {async () => {
                    await handlePlaceOrder()
                }} />
            </View>

          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 10,
    paddingBottom: 250,
  },
  flexRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  flexRowBetween: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    flexDirection: 'row',
    borderRadius: 15,
  },
  paymentGateway: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 14,
    paddingTop: 10,
  },
  cancelText: {
    marginTop: 4,
    opacity: 0.6,
  },
  addressContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.7,
    borderColor: Colors.border,
  },
  absoluteContainer: {
    marginVertical: 15,
    marginBottom: Platform.OS == 'ios' ? 30 : 10,
  },
});

export default ProductOrder;
