import ScalePress from '@components/ui/ScalePress'
import { screenHeight, screenWidth } from '@utils/Scaling'
import React, { FC } from 'react'
import {Image, StyleSheet, Text,View} from 'react-native'
import Carousal from 'react-native-reanimated-carousel'


const AdCarousal:FC<{adData:any}> =({adData})=>{

    const baseOptions={
        verticle:false,
        width:screenWidth,
        height:screenHeight *0.25

    }
    return(
        <View style={{left:-20,marginVertical:20}}>
             <Carousal 
             {...baseOptions}
             loop
             pagingEnabled
             autoPlay
             snapEnabled
             autoPlayInterval={3000}
             mode='parallax'
             data={adData}
             modeConfig={{
                parallaxScrollingOffset:0,
                parallaxScrollingScale:0.94
             }}

            renderItem={({item}:any)=>{
                return(
                   <ScalePress style={styles.imageContainer}>
                        <Image source={item} style={styles.img}/>
                   </ScalePress> 
                )
            }}  
             />
        </View>
    )
}
export default AdCarousal;
const styles = StyleSheet.create({
    imageContainer:{
        width:'100%',
        height:'100%',
    },
    img:{
        width:'100%',
        height:'100%',
        resizeMode:'cover',
        borderRadius:20
    }
})