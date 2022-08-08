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
    marginTop: (ISX === true) ? 70 : 20
  },
  
  logoStyle: {
    height: (ISX === true) ? 150 : 130, 
    width: (ISX === true) ? 150 : 130
  },
  
  titleStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.dark_blue,
    marginTop: 10
  },
  
  descriptionStyle: {
    fontSize: 18,
    color: colors.dark_blue,
    textAlign: "center"
  },
  
  viewForm: {
    width: window.width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: (ISX === true) ? 20 : 10
  },
  
  loginButton: {
    backgroundColor: colors.dark_blue
  },
  
  registerButton: {
    backgroundColor: colors.light_blue
  },
  
  forgotPasswordButton: {
    color: 'blue', 
    fontSize: 12
  },
  
  viewSocialButton: {
    width: window.width,
    alignItems: 'center',
    justifyContent: 'center',
//     backgroundColor: 'rgba(245, 245, 245, 1)'
  },
  
  textStyle: {
    fontSize: 16,
    color: colors.dark_blue,
    textAlign: "center"
  },
  
  viewRegisterButton: {
    width: window.width,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
});