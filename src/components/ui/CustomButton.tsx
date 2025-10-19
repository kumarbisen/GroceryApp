import { Colors, Fonts } from '@utils/Constants';
import React, { FC } from 'react'
import {ActivityIndicator, StyleSheet, Text,TouchableOpacity,View} from 'react-native'
import CustomText from './CustomText';

interface CustomButtonProps{
    onPress:()=> void;
    title :string;
    disabled:boolean;
    loading:boolean
}
const CustomButton:FC<CustomButtonProps> =({
    onPress,
    title,
    disabled,
    loading
})=>{
    return(
        <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
        style={[styles.btn,{
            backgroundColor:disabled?Colors.disabled:Colors.secondary
        }]}>{
            loading ? 
            <ActivityIndicator color="#fff" size='small'/>:
            <CustomText style={styles.text} varient='h6' fontFamily={Fonts.SemiBold}>
                {title}
            </CustomText>
        }
            
        </TouchableOpacity>
    )
}
export default CustomButton;
const styles = StyleSheet.create({
        btn:{
            justifyContent:"center",
            alignItems:"center",
            padding:15,
            marginVertical:15,
            borderRadius:10,
            width:"100%"
        },
        text:{
            color:"#fff"
        }
})