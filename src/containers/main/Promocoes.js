import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  Image
} from "react-native";
import { Icon,Header } from "react-native-elements";
import Slideshow from "react-native-slideshow";

import HeaderIn from '../../components/headerIn/HeaderIn';

import CardProducts from "../../components/products/CardProducts";
import Fabrica from "../../components/categories/Fabrica";
import { NavigationEvents } from '@react-navigation/native';
import Images from "../../assets/Images";
import RoundedButton from "../../components/buttons/RoundedButton";

// styles
import styles from "./styles/MainScreenStyles";
import colors from "../../styles/GlobalColors"; 

// api

import ApiAuth from "../../api/ApiAuth";

import Spinner from "../../components/spinner/Spinner";


export default class Promocoes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: "",
      app_logo: "",
      app_quem_somos: "",
      app_empresa: "",
      app_telefone: "",
      categoria_atual: "1",
      id_cliente: "",
      app_email: "",
      categories: [],
      featuredProducts: [],
      featuredBanners: [],
      cards: [],
      latitude: 0,
      longitude: 0,
      area: 1000,
      products: [],
      // ECOMMERCE
      // categories: [ 
      //   {name: "Vestidos", source:"https://static3.tcdn.com.br/img/img_prod/447013/vestido_jolie_azul_marinho_brandili_8783_1_20170830120318.jpg"}, 
      //   {name: "Camisas", source:"https://images-americanas.b2w.io/produtos/01/00/img/2594253/3/2594253303G1.jpg"}, 
      //   {name: "Blazers, jaquetas e casacos", source:"https://img.oncartx.io/unsafe/795x0/https://cdn.oncartx.io/static/products_images/HKpCPCXZa42U8F7Y9LNQflP7VbJYP3.jpg"}, 
      //   {name: "Saias", source:"https://static.riachuelo.com.br/RCHLO/14132095003/portrait/8851e9fc66517d89f2a16211e4eae58a19b6cd01.jpg"}
      // ],
      // cards: [ 
      //   {title: "Vestido Jolie", valor: "Vestidos Longos, Midi e muito mais, você encontra na Suburban", url: "https://static3.tcdn.com.br/img/img_prod/447013/vestido_jolie_azul_marinho_brandili_8783_1_20170830120318.jpg" },
      //   {title: "Camiseta Guess", valor: "Compre Camisetas com Entrega Rápida e Muito Mais. Aproveite!", url: "https://images-americanas.b2w.io/produtos/01/00/img/2594253/3/2594253303G1.jpg" },
      //   {title: "Camiseta Guess", valor: "Compre Camisetas com Entrega Rápida e Muito Mais. Aproveite!", url: "https://images-americanas.b2w.io/produtos/01/00/img/2594253/3/2594253303G1.jpg" },
      //   {title: "Vestido Jolie", valor: "Vestidos Longos, Midi e muito mais, você encontra na Suburban", url: "https://static3.tcdn.com.br/img/img_prod/447013/vestido_jolie_azul_marinho_brandili_8783_1_20170830120318.jpg" },
      //   {title: "Vestido Jolie", valor: "Vestidos Longos, Midi e muito mais, você encontra na Suburban", url: "https://static3.tcdn.com.br/img/img_prod/447013/vestido_jolie_azul_marinho_brandili_8783_1_20170830120318.jpg" },
      //   {title: "Camiseta Guess", valor: "Compre Camisetas com Entrega Rápida e Muito Mais. Aproveite!", url: "https://images-americanas.b2w.io/produtos/01/00/img/2594253/3/2594253303G1.jpg" },
      //   {title: "Camiseta Guess", valor: "Compre Camisetas com Entrega Rápida e Muito Mais. Aproveite!", url: "https://images-americanas.b2w.io/produtos/01/00/img/2594253/3/2594253303G1.jpg" },
      //   {title: "Vestido Jolie", valor: "Vestidos Longos, Midi e muito mais, você encontra na Suburban", url: "https://static3.tcdn.com.br/img/img_prod/447013/vestido_jolie_azul_marinho_brandili_8783_1_20170830120318.jpg" },
      //   {title: "Vestido Jolie", valor: "Vestidos Longos, Midi e muito mais, você encontra na Suburban", url: "https://static3.tcdn.com.br/img/img_prod/447013/vestido_jolie_azul_marinho_brandili_8783_1_20170830120318.jpg" },
      //   {title: "Camiseta Guess", valor: "Compre Camisetas com Entrega Rápida e Muito Mais. Aproveite!", url: "https://images-americanas.b2w.io/produtos/01/00/img/2594253/3/2594253303G1.jpg" },
      //   {title: "Camiseta Guess", valor: "Compre Camisetas com Entrega Rápida e Muito Mais. Aproveite!", url: "https://images-americanas.b2w.io/produtos/01/00/img/2594253/3/2594253303G1.jpg" },
      //   {title: "Vestido Jolie", valor: "Vestidos Longos, Midi e muito mais, você encontra na Suburban", url: "https://static3.tcdn.com.br/img/img_prod/447013/vestido_jolie_azul_marinho_brandili_8783_1_20170830120318.jpg" }
      // ],
 
      name:"",
      user: "",
      spinner: true
    };
 
  }
 

  componentDidMount = () => {
    var _this = this;
   

    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      _this.listProducts();
      _this.listCategorias();
      // _this.loadUser();
    });


  };
 

  componentWillUnmount() {
    this._unsubscribe();
  }


  

  loadUser = async () => {
    var _this = this;

    // var app_empresa = await AsyncStorage.getItem('app_empresa');
    // var app_email = await AsyncStorage.getItem('app_email');
   
    // _this.setState({
    //   access_token: "asdf", app_empresa: app_empresa, app_email: app_email,
    //   app_telefone: app_telefone, app_quem_somos: app_quem_somos, app_logo: app_logo, id_cliente: id_cliente
    // });
    _this.listProducts(); 
  };

  changeCategory = (categoria) => {
    this.setState({categoria_atual: categoria});
    if(categoria == "1")
      this.listProducts();
    else
      this.listProducts(categoria);
      
  }


  listProducts = (categoria) => {
    var _this = this;
   
    this.setState({spinner: true });
 

    if(categoria){
      console.log('categoria',categoria)
      ApiAuth.create(this.state.access_token)
        .listPromo('tb_promocoes','id_categoria',categoria)
        .then(response => {
          if (response.data !== "undefined" && response.data != null) {
            _this.setState({
              cards: response.data,
              spinner: false
            });
          }else{
            _this.setState({
              cards: [],
              spinner: false
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else{
      console.log('entrei else')
 
        console.log('sem categoria nem values')
        ApiAuth.create(this.state.access_token)
        .listPromo('tb_promocoes')
        .then(response => {
          if (response.data !== "undefined" && response.data != null) {
            _this.setState({
              cards: response.data,
              spinner: false
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
       
    }
  };

  listCategorias = () => {
    var _this = this;
    
    ApiAuth.create(this.state.access_token)
      .list('tb_categorias')
      .then(response => {
        if (response.data !== "undefined" && response.data != null) {
          _this.setState({
            categories: response.data,
           
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getCategories() {
    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollStyle}
      >
        <View style={styles.viewItemCategory}>
       
        {this.state.categories &&
            this.state.categories.map((products, id) => (
            <Fabrica
              key={id}
              nameatual={this.state.categoria_atual}
              name={products.categoria}
              id={products.id}
              source={products.imagem}
              onPress={() => {this.changeCategory(products.id) }}
            />
        ))}
        </View>
      </ScrollView>
    );
  }

  getBoxProducts() {
    return (
      <View style={styles.viewBox}>
        <View style={styles.viewTitleBox}>
          <Text style={styles.title}>Promoções</Text>
        </View>
        <View style={styles.viewCard}>
        {this.state.cards &&
            this.state.cards.map((products, id) => (
              <CardProducts
                key={id}
                title={products.titulo}
                subtitle={products.texto}
                imagem={products.imagem}
                link={products.link_da_imagem}
                valor={products.valor}
                styles={styles.cardStyles}
              />
        ))}
           
        </View>
       
      </View>
    );
  }

  render() {
      return (
        <View style={styles.viewContainer}>  
           <HeaderIn
              title = {this.state.nome_empresa}
              leftIcon = { true }
              goBack = {() => { this.props.navigation.goBack() }}
          />
          <ScrollView>
          
            <View style={styles.viewCategories}>
              
              {this.getCategories()}
            <View style={{borderBottomColor: '#eee', borderBottomWidth: 1}} />
             
              {this.getBoxProducts()}
            </View>
          </ScrollView>
          <Spinner title={"Aguarde, procurando..."} show={this.state.spinner} />
        </View>
      );
  }
}
