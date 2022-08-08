import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Image } from 'react-native'
import { Icon } from 'react-native-elements';
import styles from './styles/HeaderInStyles'
import colors from '../../styles/GlobalColors';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class HeaderIn extends Component {
  static propTypes = {
    leftIcon : PropTypes.bool,
    title : PropTypes.string,
    goBack : PropTypes.func,
    rightIcon : PropTypes.string,
    type : PropTypes.string,
    onPressRightIcon : PropTypes.func
  }
  
  getLeftIcon() {
    if(this.props.leftIcon === true) {
      return (
        <Ionicons
        name = "ios-home"
        size={22}
          color = { colors.dark_blue }
          onPress = { this.props.goBack }/>
      )
    }
  }
  
  getRightIcon() {
    if(this.props.rightIcon === true) {
      return(
        <Ionicons
                    name = "ios-home"
                    size={22}
                    color = { colors.dark_blue } 
                />
      )
    }
  }
  
  render() {
    return (
      <View style = { styles.viewHeader }>
        <View style = { styles.viewIconLeft }>
          { this.getLeftIcon() }
        </View>
        <View style = { styles.viewTitle }>
          <Image source={require('../../assets/img-logo.jpg')} />
        </View>
        <View style = { styles.viewIconRight }>
          { this.getRightIcon() }
        </View>
      </View>
    )
  }
}