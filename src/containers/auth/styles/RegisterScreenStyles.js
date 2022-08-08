import { StyleSheet, Dimensions, Platform } from 'react-native';
import colors from '../../../styles/GlobalColors';

const window = Dimensions.get('window');
const ISX = Platform.OS === "ios" && (window.height > 800 || window.width > 800) ? true : false;

export default StyleSheet.create({
  viewLogo: {
    width: window.width,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: (ISX === true) ? 50 : 10,
//     backgroundColor: 'red'
  },
  
  logoStyle: {
    height: (ISX === true) ? 130 : 80, 
    width: (ISX === true) ? 130 : 100
  },
  
  viewForm: {
    width: window.width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: (ISX === true) ? 0 : 0
  },
  
  loginButton: {
    color: colors.dark_blue, 
    fontSize: 14
  },
  
  registerButton: {
    backgroundColor: colors.dark_blue
  },

  textStyle: {
    fontSize: 14,
    color: colors.dark_blue,
    textAlign: "center"
  },
  
  linkStyle: {
    fontWeight: 'bold'
  },
  
  viewTerms: {
    paddingHorizontal: 20,
    paddingVertical: (ISX === true) ? 20 : 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  viewRegisterButton: {
    width: window.width,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
});