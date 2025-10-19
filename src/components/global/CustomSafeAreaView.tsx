import { FC, ReactNode } from "react";
import { SafeAreaView, StyleSheet, ViewStyle } from "react-native";

interface CustomSafeAreaView{
    children:ReactNode,
    style?: ViewStyle
}

import React from 'react'
import {Text,View} from 'react-native'


const CustomSafeAreaView:FC<CustomSafeAreaView>=({children,style})=>{
    return(
        <View style={styles.container}>
           <SafeAreaView/>
           {children}
        </View>
    )
}
export default CustomSafeAreaView;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff",
        marginTop:10
    }
})