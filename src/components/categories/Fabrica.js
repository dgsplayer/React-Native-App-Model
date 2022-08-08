import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './styles/CategoryStyles'

export default class Fabrica extends Component {
  static propTypes = {
    source : PropTypes.string,
    name : PropTypes.string,
    id : PropTypes.string,
    onPress : PropTypes.func
  }

  render() {
    return (
      <TouchableOpacity
        style = { styles.viewCategory }
        onPress = { this.props.onPress }>
       <View style = { styles.viewIcon }>
        <Image
            resizeMode = 'cover'
            source = {{uri: "https://suburban.com.br/painel/theme/arquivos/"+this.props.source}}
            style = { styles.iconStyle }/>
        </View>
        <Text style = { [styles.nameStyle, this.props.id == this.props.nameatual ? 
          {fontWeight: 'bold', color: '#3B5998', fontSize: 14} : {color: '#000000'} ] }>{ this.props.name }</Text>
      </TouchableOpacity>
    )
  }
}
