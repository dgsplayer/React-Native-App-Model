import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../styles/GlobalColors';

const window = Dimensions.get('window');

export default StyleSheet.create({
  containerLogo: {
    flex: 3,
    width: window.width,
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  logoStyle: {
    width: 200,
  },
  
  containerButton: {
    flex: 1,
    width: window.width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 20
  },
  
  loginButton: {
    backgroundColor: colors.dark_blue
  },
  
  registerButton: {
    backgroundColor: colors.light_blue
  }
});