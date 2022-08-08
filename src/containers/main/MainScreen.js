import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Linking,
  ScrollView,
  AsyncStorage,
  Image
} from "react-native";
import HeaderIn from '../../components/headerIn/HeaderIn';
import styles from "./styles/MainScreenStyles";
import ApiAuth from "../../api/ApiAuth";
import Spinner from "../../components/spinner/Spinner";

export default class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: "",
      responseBanners: [],    
      nome_empresa: "Empresa Aqui",
      status: true
    };
  }
 
  componentDidMount = () => {
    var _this = this;
  
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      _this.loadUser();
    });
  };
  

  componentWillUnmount() {
    this._unsubscribe();
  }
 

  loadUser = async () => {
    var _this = this;
  
    _this.listBanners(); 
  };


  listBanners = () => {
    var _this = this;
    
    ApiAuth.create(this.state.access_token)
      .list('tb_banners')
      .then(response => {
        if (response.data !== "undefined" && response.data != null) {
          _this.setState({
            responseBanners: response.data,
            status: false
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
 

  render() {
    if (this.state.status == false) {
      return (
        <View style={styles.viewContainer}>  
          <HeaderIn
              title = {this.state.nome_empresa}
              leftIcon = { false }
              goBack = {() => { this.props.navigation.goBack() }}
          />
          <ScrollView>

          <TouchableOpacity
                onPress={() => {this.props.navigation.navigate("LoginScreen") }}
                style = {this.props.styles}>
            <View style={styles.viewImage}>  
                <Image style={{height: '100%'}} source={{uri: "https://xxx.com.br/painel/theme/arquivos/"+this.state.responseBanners[0].imagem}} />          
            </View> 
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {this.props.navigation.navigate("Promocoes") }}
                style = {this.props.styles}>
              <View style={styles.viewImage}>  
                <Image style={{height: '100%'}} source={{uri: "https://xxx.com.br/painel/theme/arquivos/"+this.state.responseBanners[1].imagem}} />            
              </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {Linking.openURL("https://api.whatsapp.com/send?&phone=+")}}
                style = {this.props.styles}>
                <View style={styles.viewImage}>  
                <Image style={{height: '100%'}} source={{uri: "https://xxx.com.br/painel/theme/arquivos/"+this.state.responseBanners[2].imagem}} />             
                </View> 
            </TouchableOpacity>
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={styles.viewContainer}>
          <Spinner
            title="Carregando ..."
            show={this.state.status}
          />
        </View>
      );
    }
  }
}
