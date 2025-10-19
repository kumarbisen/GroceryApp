import CustomText from '@components/ui/CustomText'
import BillDetails from '@features/order/BillDetails'
import { Colors, Fonts } from '@utils/Constants'
import React, { FC } from 'react'
import {StyleSheet, Text,View} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { Image } from 'react-native'
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons'



const OrderSummery:FC<{order:any}> =({order})=>{
    const totalPrice = 
    order?.items?.reduce(
        (total:number ,cartItem:any) => 
            total + cartItem.item.price * cartItem.count,0,
    ) || 0
    return(
        <View style={styles.container}>
           <View style={styles.flexRow}>
            <View style={styles.iconContainer}>
                <Icon name='shoe-ballet'
                color={Colors.disabled} 
                size={RFValue(20)}/>
            </View>
            <View>
                <CustomText varient='h7' fontFamily={Fonts.SemiBold}>
                Order summary
            </CustomText>
            <CustomText varient='h9' fontFamily={Fonts.Medium}>
                Order ID - #(order?.orderId)
            </CustomText>
            </View>
            

           </View>
           {/* kyuki order update nahi ho raha isliye ye ui render nahi ho raha hai  */}
           {order?.items?.map((item :any ,index :number)=>{
            return(
                <View style={styles.flexRow} key={index}>
                    <View style={styles.imgContainer}>
                        <Image style={styles.img} source={{uri:item?.item?.image}} />
                    </View>
                    <View style={{width:'55%'}}>
                        <CustomText
                        numberOfLines={2}
                        varient='h8'
                        fontFamily={Fonts.Medium}>
                            {item.item.name}
                        </CustomText>
                        <CustomText varient='h9'>{item.item.quantity}</CustomText>
                    </View>
                    <View style={{width:'20%',alignItems:'flex-end'}}>
                        <CustomText
                        varient='h8'
                        fontFamily={Fonts.SemiBold}
                        style={{alignSelf:'flex-end', marginTop:4}}>
                            {item.count}x
                        </CustomText>
                    </View>


                </View>
            )
           })}
           <BillDetails totalItemPrice={totalPrice}/>
        </View>
    )
}
const styles = StyleSheet.create({
    
    iconContainer:{
        backgroundColor:Colors.backgroundSecondary,
        borderRadius:100,
        padding:10,
        justifyContent:'center',
        alignItems:'center'
    },
    flexRow:{
        flexDirection:'row',
        alignItems:'center',
        gap:10,
        padding:10,
        borderBottomWidth:0.7,
        borderColor:Colors.border
    },
    img:{
        width:40,
        height:40,
    },
    imgContainer:{
        backgroundColor:Colors.backgroundSecondary,
        padding:10,
        borderRadius:15,
        width:'17%'
    },
    container:{
        width:'100%',
        borderRadius:15,
        marginVertical:15,
        paddingVertical:10,
        backgroundColor:'#fff'
    }
})
export default OrderSummery;