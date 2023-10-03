import { Image, StyleSheet } from 'react-native';

export const Avatar = ({ source }) => {
  return <Image source={source} style={styles.avatar} />;
};

const styles = StyleSheet.create({
  avatar: {
    height: 30,
    width: 30
  }
});
