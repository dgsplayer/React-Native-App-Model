import { StyleSheet, Dimensions, Platform } from 'react-native';
import colors from '../../../styles/GlobalColors';

const window = Dimensions.get('window');
const ISX = Platform.OS === "ios" && (window.height > 800 || window.width > 800) ? true : false;

export default StyleSheet.create({
  viewHeader: {
    width: window.width,
    height: 60,
    paddingTop: (ISX === true) ? 0 : 0,
    paddingHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#B6B6B6',
    elevation: 3,
    backgroundColor: 'white',
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 }
  },
  
  viewIconLeft: {
    width: 20,
    marginLeft: 10
  },
  
  viewTitle: {},
  
  titleStyle: {
    color: colors.dark_blue,
    fontWeight: 'bold'
  },
  
  viewIconRight: {
    width: 30,
  }
})