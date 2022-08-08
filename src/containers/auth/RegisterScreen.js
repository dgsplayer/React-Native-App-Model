import React, { Component } from 'react';
import { View, Image, Text, BackHandler, ScrollView, Alert } from 'react-native';
import { Button, Icon } from 'react-native-elements';

// components
import RoundedButton from '../../components/buttons/RoundedButton';
// import SocialButton from '../../components/buttons/SocialButton';
import LineInput from '../../components/inputs/LineInput';
import Logo from '../../components/logotipo/Logo';

import ApiAuth from '../../api/ApiAuth'; 
// styles
import styles from './styles/RegisterScreenStyles';
import GlobalStyles from '../../styles/GlobalStyles';
// import colors from '../../styles/GlobalColors';
import Images from '../../assets/Images';
import Toast from "react-native-tiny-toast";

// api
// import Api from '../../api/Api';
// import PolicyScreen from '../main/PolicyScreen';

export default class RegisterScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      fisrtName : '',
      firstNameError : '',
      lastName : '',
      lastNameError : '',
      email : '',
      emailError : '',
      password : '',
      passwordError : '',
      confirmPassword : '',
      confirmPasswordError : ''
    }
  }

  componentDidMount = () => {
    var _this = this;
    BackHandler.addEventListener("hardwareBackPress", function() {
      const { navigation } = _this.props;
      navigation.navigate("LoginScreen");
      
    });

  };

  isValidEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  doRegister() {
    var formValid = true;
    var firstNameMessage = "";
    var lastNameMessage = "";
    var _this = this;
    var emailMessage = "";
    var passwordMessage = "";
    var confirmPasswordMessage = "";

    if(this.state.firstName == null || this.state.firstName.length < 1) {
      formValid = false;
      firstNameMessage = "Campo nome é obrigatório.";
    } else {
      firstNameMessage = null;
    }
    // if(this.state.lastName == null || this.state.lastName.length < 1) {
    //   formValid = false;
    //   lastNameMessage += "Campo sobrenome é obrigatório.";
    // } else {
    //   lastNameMessage = null;
    // }
    if(this.state.email == null || this.state.email.length < 1) {
      formValid = false;
      emailMessage += "Campo email é obrigatório.";
    }
    else if(! this.isValidEmail(this.state.email)) {
      formValid = false;
      emailMessage += "Informe um email válido.";
    } else {
      emailMessage = null;
    }
    if(this.state.password == null || this.state.password.length < 1) {
      formValid = false;
      passwordMessage += "Campo senha é obrigatório.";
    } else {
      passwordMessage = null;
    }
    if(this.state.confirmPassword == null || this.state.confirmPassword < 1) {
      formValid = false;
      confirmPasswordMessage += "Campo confirmar senha é obrigatório.";
    }
    else if(this.state.confirmPassword != this.state.password) {
      formValid = false;
      confirmPasswordMessage += "As senhas são diferentes.";
    }
    if(formValid) {

      input = {
        nome_usuario:_this.state.firstName, 
        email:_this.state.email, 
        senha:_this.state.password
    };

    ApiAuth.create('senha').add('tb_usuarios',input).then((response) => {
        console.warn(response);
        if(response.status == 200){
          Toast.show('Cadastrado com sucesso. Faça seu login!')
          this.props.navigation.navigate("LoginScreen");
        }else{
          Toast.show('Falha. Por favor, tente novamente.!');
        }
        _this.setState({ spinner: false });

    }).catch(function (error) {
        _this.setState({ spinner: false });

        console.log(error)
    });

      // Api.create().register(this.state.firstName, this.state.lastName, this.state.email, this.state.password, this.state.confirmPassword).then((response) => {
      //   console.log(response)
      //   if(response.data.result) {
      //     this._showAlert(response.data.message, '');
      //     this.props.navigation.navigate("LoginScreen");
      //   } else {
      //     this._showAlert('Falha', 'Por favor, tente novamente.');
      //   }
      // }).catch(function(error) {
      //   console.log(error)
      // });
    } else {
      this.setState({
        firstNameError : firstNameMessage,
        lastNameError : lastNameMessage,
        emailError : emailMessage,
        passwordError : passwordMessage,
        confirmPasswordError : confirmPasswordMessage
      });
    }
  }

  _showAlert(title, message) {
    Alert.alert(
      title,
      message,
      [ {text: 'OK', onPress: () => console.log('OK pressed')}, ],
      { cancelable: false }
    )
  }

  render() {
    return (
      <View style = { GlobalStyles.container }>
        <ScrollView>
          <View style = { styles.viewLogo }>
            <Logo
              source = { Images.logotipo2 }
              styles = { styles.logoStyle }/>
          </View>
          <View style = { styles.viewForm }>
            <LineInput
              label = 'Empresa'
              placeholder = 'Informe a empresa'
              value = { this.state.firstName }
              autoCapitalize = 'words'
              onChangeText = {(firstName) => { this.setState({ firstName : firstName }) }}
              errorMessage = { this.state.firstNameError }/>
       
            <LineInput
              label = 'Email'
              placeholder = 'Informe o seu email'
              value = { this.state.email }
              autoCapitalize = 'none'
              keyboardType = 'email-address'
              onChangeText = {(email) => { this.setState({ email : email }) }}
              errorMessage = { this.state.emailError }/>
            <LineInput
              label = 'Senha'
              placeholder = 'Cadastre sua senha'
              value = { this.state.password }
              autoCapitalize = 'none'
              password = { true }
              onChangeText = {(password) => { this.setState({ password : password }) }}
              errorMessage = { this.state.passwordError }/>
            <LineInput
              label = 'Confirmar senha'
              placeholder = 'Confirme sua senha'
              value = { this.state.confirmPassword }
              autoCapitalize = 'none'
              password = { true }
              onChangeText = {(confirmPassword) => { this.setState({ confirmPassword : confirmPassword }) }}
              errorMessage = { this.state.confirmPasswordError }/>
            <RoundedButton
              title = 'Registrar-se'
              styles = { styles.registerButton }
              onPress = {() => { this.doRegister() }}/>
          </View>{/*
          <View style = { styles.viewTerms }>
            <Text style = { styles.textStyle }>Ao criar sua conta, você concorda com os nossos</Text>
            <Text style = { styles.textStyle }>
              <Text
                style = { styles.linkStyle }
                onPress = {() => this.props.navigation.navigate('TermsScreen')}>Termos de Uso</Text>
              <Text> e </Text>
               <Text
                style = { styles.linkStyle }
                onPress = {() => this.props.navigation.navigate('PolicyScreen')}>Políticas de Privacidade</Text> 
            </Text>
          </View>*/}
          <View>
            <Button
              title = "Já possui uma conta?"
              type = "clear"
              titleStyle = { styles.loginButton }
              onPress = {() => { this.props.navigation.goBack() }}/>
          </View>
        </ScrollView>
      </View>
    )
  }
}
