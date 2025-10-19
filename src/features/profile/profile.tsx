import CustomHeader from '@components/ui/CustomHeader';

import { fetchCustomerOrders } from '@service/OrderService';
import { useAuthStore } from '@state/authStore';
import { useCartStore } from '@state/cartStore';
import React, { useEffect, useState } from 'react'
import {FlatList, Text,View} from 'react-native'
import { StyleSheet } from 'react-native';
import ProfileOrderItem from './ProfileOrderItem';
import CustomText from '@components/ui/CustomText';
import { Fonts } from '@utils/Constants';
import ActionButtton from './ActionButtton';
import { storage, tokenStorage } from '@state/storage';
import { resetAndNavigate } from '@utils/NavigationUtils';
import WalletSection from './WalletSection';


const Profile =()=>{
    const [orders,setOrders] = useState([]);
    const {logout,user}= useAuthStore()
    const {clearCart} = useCartStore()

    const fetchOrders = async () =>{
        const data = await fetchCustomerOrders(user?._id);
        setOrders(data)
    }


    useEffect(()=>{
        fetchOrders();
    },[])

    const renderOrders =({item,index}:any) =>{
        return(
            <ProfileOrderItem item={item} index={index}/>
        )
    }

    const renderHeader =() =>{
        return(
            <View>
                <CustomText varient='h3' fontFamily={Fonts.SemiBold}>
                    Your account
                </CustomText>
                <CustomText varient='h7' fontFamily={Fonts.Medium}>
                    {user?.phone}
                </CustomText>

                <WalletSection />

                <CustomText varient='h8' style={styles.informativeText} >
                    YOUR INFORMATION
                </CustomText>
                <ActionButtton  icon='book-outline' label='Address book'/>
                <ActionButtton  icon='information-circle-outline' label='About us'/>
                <ActionButtton 
                icon='log-out-outline'
                label='Logout'
                onPress={()=> {
                    clearCart()
                    logout();
                    tokenStorage.clearAll();
                    storage.clearAll();
                    resetAndNavigate('CustomerLogin')
                }}
                
                />
            </View>
        )
    }
    return(
        <View style={styles.container}>
            <CustomHeader  title='Profile'/>
            <FlatList 
            data={orders}
            ListHeaderComponent={renderHeader}
            renderItem={renderOrders}
            keyExtractor={(item:any) => item?.orderId}
            contentContainerStyle={styles.scrollViewContent}
            
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    scrollViewContent:{
        padding:10,
        paddingTop:20,
        paddingBottom:100
    },
    informativeText:{
        opacity:0.7,
        marginBottom:20
    },
    pastText:{
        marginVertical:20,
        opacity:0.7
    }
})
export default Profile;