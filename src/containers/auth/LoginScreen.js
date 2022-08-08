import React, { Component } from 'react';
import {View, Text, ScrollView, Alert, AsyncStorage, Linking} from 'react-native';
import { Button } from 'react-native-elements';

// import OneSignal from 'react-native-onesignal'
// components
import RoundedButton from '../../components/buttons/RoundedButton';
import LineInput from '../../components/inputs/LineInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ApiAuth from '../../api/ApiAuth'; 
import HeaderIn from '../../components/headerIn/HeaderIn';
import { TextInputMask } from 'react-native-masked-text';

// styles
import styles from './styles/LoginScreenStyles';
import GlobalStyles from '../../styles/GlobalStyles';
import { create } from 'apisauce'
import Toast from "react-native-tiny-toast";
import Spinner from "../../components/spinner/Spinner";
import PushNotification from 'react-native-push-notification';


export default class LoginScreen extends Component<Props> {
	constructor(props) {
		super(props);
		this.state = {
			emailError: '',
			
			passwordError: '',
			tokenKey: '',
			disable_ui: false,
			spinner: false,
			password: '',
			cnpj: "",
			// email: "douglasmpcampos+hulk@gmail.com",
			// password: '123qwe',
			pushToken: "fail"+Date.now(),
			player_id: "fail"+Date.now()
		}
		_this = this
	}
	
	componentDidMount(){

		this._loadUser();
		this._configure();

	}

	_loadUser = async () => {
		// var link = await AsyncStorage.getItem('link');
		var cnpj = await AsyncStorage.getItem('cnpj');
    
    if (cnpj) {
      // Linking.openURL(link);
			this.doLogin();
			// this.props.navigation.navigate("Tabss");
    }
     
  };

	_configure = async () => {
    var that = this;
    console.warn('ENTREI 2')
  
    PushNotification.configure({
  
      onError: function (e) {
        console.warn("ERROR " + e)
      },
  
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        var tok = token.token;
        console.warn('TOKEN 222 ================>', tok);
        that.setState({ tokenKey: tok });
      },
  
      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.warn('NOTIFICATION:', notification);
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
  
      // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: "xxx",
  
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },
  
      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,
  
      /**
        * (optional) default: true
        * - Specified if permissions (ios) and token (android and ios) will requested or not,
        * - if not, you must call PushNotificationsHandler.requestPermissions() later
        */
      requestPermissions: true,
  
    });
  };
 
	doLogin = async () => {
		var formValid = true; 
		var _this = this;

		var cnpj = await AsyncStorage.getItem('cnpj');

		if(!cnpj){

				if (!this.state.cnpj) {
					Toast.show('Campo cnpj é obrigatório.',{
						position: 3,
						containerStyle:{backgroundColor: 'red'}
					})
					return false;
				}
		
				if (this.state.cnpj.length < 14) {
					Toast.show('CNPJ incompleto',{
					position: 3,
					containerStyle:{backgroundColor: 'red'}
				})
				return false;
			}

			cnpj = this.state.cnpj;

		}

		
	

	_this.setState({ spinner: true });

		// PRIMEIRA CHAMADA
		const api = create({
			baseURL: 'https://b2b.xxx.com.br/acesso-externo/auth',
			headers: { Accept: 'application/json' },
		})

		api.post('/', 
		{ usuario: 'xxx', senha: 'xxx' })
		.then((response) => {
			console.log('RESPONSE 1',response.data)
			if (response.data.hasErro == false) {
				
				const token = response.data.result;


				//SEGUNDA CHAMADA
				const apiNova = create({
					baseURL: 'https://b2b.xxxxx.com.br/acesso-externo/solicita',
					headers: { Accept: 'application/json', Authorization: token},
				})
				apiNova.post('/', 
					{ documento: cnpj })
					.then((response) => {
						console.log('RESPONSE 2',response.data)
						if (response.data.hasErro == false) {
							// _this.setState({ spinner: false });
						Toast.show('Redirecionando...');
						var link = response.data.result;
						AsyncStorage.setItem('cnpj', cnpj);

						//SALVA TOKEN
							if(_this.state.tokenKey){
								var input = {
									cnpj: cnpj,
									token: _this.state.tokenKey
								}
							
								console.log('tessste',input);
								// return false;
							ApiAuth.create().save('tb_usuarios', input).then((response) => {
									console.log(response)
									if (response.status == 200) {
										_this.setState({ spinner: false });
										// Toast.show("Solicitação de agendamento enviada.");
						 
										Linking.openURL(link);
										_this.props.navigation.navigate("Tabss");
										 
						
									} 
									else {
										_this.setState({ spinner: false });
										Toast.show("Não encontrado servidor.");
									}
								}).catch(function (error) {
									_this.setState({ spinner: false });
									console.log(error)
								});
							}else{
								_this.setState({ spinner: false });
								Linking.openURL(response.data.result);
							_this.props.navigation.navigate("Tabss");
							}




							
							
						}
						else {
							_this.setState({ spinner: false });
							Toast.show(response.data.result);
						}
					}).catch(function (error) {
						_this.setState({ spinner: false });
						console.log(error)
					});



			}
			else {
				_this.setState({ spinner: false });
				Toast.show(response.data.result);
			}
		}).catch(function (error) {
			_this.setState({ spinner: false });
			console.log(error)
		});
		 
	}
 
 
	render() {
		return (
			<View
				style={GlobalStyles.container}>
					 <HeaderIn
              title = {this.state.nome_empresa}
              leftIcon = { false }
              goBack = {() => { this.props.navigation.goBack() }}
          />
				<ScrollView keyboardShouldPersistTaps='always'>
				 
					<View style={styles.viewForm}>

					<TextInputMask
                value={this.state.cnpj}
								onChangeText={(cnpj) => { this.setState({ cnpj: cnpj }) }}
                // autoFocus={true}
                placeholder='Informe o seu cnpj'
                type={'cnpj'}
                style={styles.defaultWidth,{width: '100%', fontSize: 16}} />
 
						 
						<RoundedButton
							title='Entrar'
							styles={styles.loginButton}
							onPress={() => { this.doLogin() }} />
						<Button
							title = "Esqueci minha senha"
							type = "clear"
							titleStyle = {styles.forgotPasswordButton}
							onPress = {() => {  Linking.openURL("https://b2b.xxx.com.br/esqueci-senha")
							 }} />
					</View>
				 <View style={styles.viewRegisterButton}>
						<Text style={styles.textStyle}>Ainda não tem uma conta?</Text>
						<RoundedButton
							title='Cadastre-se'
							styles={styles.registerButton}
							onPress={() => { Linking.openURL("https://b2b.xxx.com.br/cadastro") }} />
					</View> 
				</ScrollView>
				<Spinner title={"Aguarde, procurando..."} show={this.state.spinner} />
			</View>
		)
	}
}
