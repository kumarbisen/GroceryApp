import React from 'react'
import {Text,View} from 'react-native'


const Markers =({
    deliveryLocation,
    pickupLocation,
    deliveryPersonLocation
}:any)=>{
    return(
        <>
        {deliveryLocation && (
            <Markers 
            image={require('@assets/icons/my_pin.png')}
            coordinate={deliveryLocation}
            style={{height:20, width:20}}
            />
        )}
        {pickupLocation && (
            <Markers
            image={require('@assets/icons/delivery.png')}
            coordinate={pickupLocation}
            style={{height:20,width:20}}
            />
        )}

        {deliveryPersonLocation && (
            <Markers
            image={require('@assets/icons/delivery.png')}
            coordinate={deliveryPersonLocation}
            style={{
                position:'absolute',
                zIndex:99,
                height:20,
                width:20
            }}
            />
        )}
        </>
    )
}
export default Markers;