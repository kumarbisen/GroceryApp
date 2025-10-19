import Notice from '@components/dashboard/Notice';
import { NoticeHeight } from '@utils/Scaling';
import React, { FC } from 'react';
import { StyleSheet,View, Animated } from 'react-native';

const NOTICE_HEIGHT = -(NoticeHeight + 12);
// if you don't want to use interface in typescript use curly-braces at type define
const NoticeAnimation: FC<{
  noticePosition: any ;
  children: React.ReactElement;
}> = ({ noticePosition, children }) => {
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.noticeContainer,
          { transform: [{ translateY: noticePosition }] }]}>
        <Notice />
      </Animated.View>
      <Animated.View
        style={[
          styles.contentContainer,
          {
            paddingTop:noticePosition.interpolate({
              inputRange: [NOTICE_HEIGHT, 0],
              outputRange: [0, NoticeHeight + 20],
            }),
          },
        ]}
      >
        {children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  noticeContainer: {
    width: '100%',
    zIndex: 999,
    position: 'absolute',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
export default NoticeAnimation;
