import { StyleSheet } from 'react-native';
import colors from '../../../styles/GlobalColors';

export default StyleSheet.create({
  container : {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 10,
    // marginRight: 10 
  },
  
  viewImage : {
    width: '100%',
    height: 140,
    backgroundColor: 'white',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  imageStyle : {
    width: 80,
    height: 80
  },
  
  viewDescription : {
    width: '100%',
    height: 30
  },
  
  titleProduct: {
    color: colors.dark_blue
  },

  viewLocation: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-start', 
    marginTop: 5
  },
  
  textLocation : {
    fontSize: 12, 
    color: 'grey'
  }  ,
  navBar: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'blue',
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'white'
  },
  rightContainer: {
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    // backgroundColor: 'white',
  },
  rightIcon: {
   
    resizeMode: 'contain',
    backgroundColor: 'white',
  }
})