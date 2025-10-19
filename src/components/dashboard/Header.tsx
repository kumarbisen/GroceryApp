import CustomText from '@components/ui/CustomText';
import Geolocation from '@react-native-community/geolocation';
import { reverseGeocode } from '@service/mapService';
import { useAuthStore } from '@state/authStore'
import { Fonts } from '@utils/Constants';
import React, { FC, useEffect } from 'react'
import {Platform, StyleSheet, Text,TouchableOpacity,View} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { navigate } from '@utils/NavigationUtils';
const Header:FC<{showNotice:()=> void}> =({showNotice})=>{

    const {setUser, user} = useAuthStore();
    const updateUserLocation = async()=>{
        Geolocation.requestAuthorization();
        Geolocation.getCurrentPosition(
            position => {
                const {latitude, longitude} = position.coords;
                reverseGeocode(latitude,longitude ,setUser)
            },
            error => console.log(error),
            {
                enableHighAccuracy:false,
                timeout:10000,
            }
        )
    }

    useEffect(()=>{
        updateUserLocation;
    },[])
    return(
        <View style={styles.subContainer}>
            <TouchableOpacity activeOpacity={0.8}>
                    <CustomText fontFamily={Fonts.Bold} varient='h8' style={styles.text} >
                        Delivery in
                    </CustomText>
                    <View style={styles.flexRowGap}>
                       <CustomText fontFamily={Fonts.SemiBold} varient='h2' style={styles.text}>
                        15 minutes
                       </CustomText>
                       <TouchableOpacity style={styles.noticeBtn} onPress={showNotice}>
                            <CustomText
                            fontSize={RFValue(5)}
                            fontFamily={Fonts.SemiBold}
                            style={{color:'#3B4886'}}>
                                    Rain
                            </CustomText>
                       </TouchableOpacity>
                    </View>
                        <View style={styles.flexRow}>
                            <CustomText
                            varient='h8'
                            numberOfLines={1}
                            fontFamily={Fonts.Medium}
                            style={styles.text2}
                            >{user?.address || 'Knowhere, somewhere...'}
                             </CustomText>
                             <Icon 
                             name="arrow-drop-down"
                             color='#fff'
                             size={RFValue(20)}
                             style={{bottom:-1}}
                             />

                             <Ionicons onPress={()=>{
                                navigate('profile')
                             }} name='person-circle-outline'color={'white'} size={RFValue(30)} />

                        </View>
                        
            </TouchableOpacity>
        </View>
    )
}
export default Header;

const styles = StyleSheet.create({
    text:{
        color:'#fff'
    },
    text2:{
        color:'#fff',
        width:'60%',
        textAlign:'center'
    },
    flexRow:{
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        gap:2,
        width:'70%'
    },
    subContainer:{
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10,
        paddingTop:Platform.OS === 'android'?10 :5,
        justifyContent:'space-between'
    },
    flexRowGap:{
        flexDirection:'row',
        alignItems:'center',
        gap:5
    },
    noticeBtn:{
        backgroundColor:'#E8EAF5',
        borderRadius:100,
        paddingHorizontal:8,
        paddingVertical:2,
        bottom:-2
    }
})