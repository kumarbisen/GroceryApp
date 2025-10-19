import { Colors, Fonts } from '@utils/Constants';
import React, { FC } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons';
import RollingBar from 'react-native-rolling-bar'
import CustomText from '@components/ui/CustomText';

const SearchBar:FC = () => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <Icon name="search" color={Colors.text} size={RFValue(20)} />
      <RollingBar
        interval={3000}
        defaultStyle={false}
        customStyle={styles.textContainer}>
        <CustomText varient="h6" fontFamily={Fonts.Medium}>
          Search "sweets"
        </CustomText>
        <CustomText varient="h6" fontFamily={Fonts.Medium}>
          Search "milk"
        </CustomText>
        <CustomText varient="h6" fontFamily={Fonts.Medium}>
          Search for ata,dal,coke
        </CustomText>
        <CustomText varient="h6" fontFamily={Fonts.Medium}>
          Search "chips
        </CustomText>
        <CustomText varient="h6" fontFamily={Fonts.Medium}>
          Search "pooja thali"
        </CustomText>
      </RollingBar>
    </TouchableOpacity>
  );
};
export default SearchBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f4f7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    borderWidth: 0.6,
    borderColor: Colors.border,
    marginTop: 15,
    overflow: 'hidden',
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  textContainer: {
    width: '90%',
    paddingLeft: 10,
    height: 50,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: '#ddd',
    marginHorizontal: 10,
  },
});
