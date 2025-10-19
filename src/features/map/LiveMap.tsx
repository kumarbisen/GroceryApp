import { handleFitPath } from '@components/map/mapUtils';
import MapViewComponent from '@components/map/MapViewComponent';
import { useMapRefStore } from '@state/mapStore';
import { Colors } from '@utils/Constants';
import { screenHeight } from '@utils/Scaling';
import React, { FC, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface LiveMapProps {
  deliveryPersonLocation: any;
  pickupLocation: any;
  deliveryLocation: any;
  hasPickedUp: any;
  hasAccepted: any;
}
const LiveMap: FC<LiveMapProps> = ({
  deliveryLocation,
  deliveryPersonLocation,
  hasAccepted,
  hasPickedUp,
  pickupLocation,
}) => {
  const { mapRef, setMapRef } = useMapRefStore();
  useEffect(()=>{
        if(mapRef){
            handleFitPath(
                mapRef,
                deliveryLocation,
                pickupLocation,
                hasPickedUp,
                hasAccepted,
                deliveryPersonLocation
            )
        }
  },[
    mapRef,
    deliveryPersonLocation,
    hasAccepted,
    hasPickedUp,
    deliveryLocation
  ])
  return (
    <View style={styles.container}>

        <MapViewComponent
        mapRef ={mapRef}
        setMapRef ={setMapRef}
        hasAccepted = {hasAccepted}
        deliveryLocation = {deliveryLocation}
        pickupLocation = {pickupLocation}
        deliveryPersonLocation = {deliveryPersonLocation}
        hasPickedUp = {hasPickedUp}

        />
      <TouchableOpacity
        style={styles.fitButton}
        onPress={() => {
          handleFitPath(
            mapRef,
            deliveryLocation,
            pickupLocation,
            hasAccepted,
            hasPickedUp,
            deliveryPersonLocation,
          );
        }}
      >
        <Icon name="target" size={RFValue(14)} color={Colors.text} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: screenHeight * 0.35,
    width: '100%',
    borderRadius: 15,
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    position: 'relative',
  },
  fitButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    padding: 5,
    backgroundColor: '#fff',
    borderWidth: 0.8,
    borderColor: Colors.border,
    shadowOffset: { width: 1, height: 2 },
    shadowColor: 'black',
    shadowRadius: 10,
    shadowOpacity: 0.2,
    elevation: 5,
    borderRadius: 35,
  },
});
export default LiveMap;
