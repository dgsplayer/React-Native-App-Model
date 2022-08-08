import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';



// api
import Api from '../../api/Api';

export default class LogoutScreen extends Component<Props> {

	constructor(props) {
			super(props);
	}

	componentDidMount = () => {
		this.loadUser();
	}

	loadUser = () => {
		AsyncStorage.setItem('token', '');
		AsyncStorage.setItem('id_usuario', '');
		AsyncStorage.setItem('id_cliente', '');
		AsyncStorage.setItem('id_empresa', '');
		AsyncStorage.setItem('email', '');
		AsyncStorage.setItem('nome', '');
		AsyncStorage.setItem('telefone', '');
		AsyncStorage.setItem('email', '');

		AsyncStorage.setItem('app_empresa', '');
		AsyncStorage.setItem('app_email', '');
		AsyncStorage.setItem('app_telefone', '');
		AsyncStorage.setItem('app_logo', '');
		AsyncStorage.setItem('app_quem_somos', '');

	
	
	
		this.props.navigation.navigate('LoginScreen');
	}


  render() {
    return (
      <View/>
    )
  }
}
