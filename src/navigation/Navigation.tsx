import React from 'react'
import {Text,View} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import { navigationRef } from '@utils/NavigationUtils';
import SplashScreen from '@features/auth/SplashScreen';
import CustomerLogin from '@features/auth/CustomerLogin';
import DeliveryLogin from '@features/auth/DeliveryLogin';
import ProductDashboard from '@features/dashboard/ProductDashboard';
import DeliveryDashboard from '@features/delivery/DeliveryDashboard';
import ProductCategory from '@features/category/ProductCategory';
import ProductOrder from '@features/order/ProductOrder';
import OrderSuccess from '@features/order/OrderSuccess';
import LiveTracking from '@features/map/LiveTracking';
import Profile from '@features/profile/profile';
import WalletSection from '@features/profile/WalletSection';


const Stack = createNativeStackNavigator();


const Navigation =()=>{
    return(
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
            initialRouteName='SplashScreen'
            screenOptions={{
                headerShown:false}}>       
                    <Stack.Screen  name='SplashScreen' component={SplashScreen} ></Stack.Screen>
                    <Stack.Screen  name='ProductDashboard' component={ProductDashboard} ></Stack.Screen>
                    <Stack.Screen  name='ProductOrder' component={ProductOrder} ></Stack.Screen>
                    <Stack.Screen  name='OrderSuccess' component={OrderSuccess} ></Stack.Screen>
                    <Stack.Screen  name='profile' component={Profile} ></Stack.Screen>
                    <Stack.Screen  name='DeliveryDashboard' component={DeliveryDashboard} ></Stack.Screen>
                    <Stack.Screen  name='LiveTracking' component={LiveTracking} ></Stack.Screen>
                    <Stack.Screen  name='WalletSection' component={WalletSection} ></Stack.Screen>
                    <Stack.Screen  name='ProductCategories' component={ProductCategory} ></Stack.Screen>
                    <Stack.Screen options={{
                        animation:"fade"
                    }} name='CustomerLogin' component={CustomerLogin}></Stack.Screen>
                    <Stack.Screen options={{
                        animation:"fade"
                    }} name='DeliveryLogin' component={DeliveryLogin}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default Navigation;