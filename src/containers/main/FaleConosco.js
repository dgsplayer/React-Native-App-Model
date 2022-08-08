import React, { Component } from "react";
import {
  View,
  AsyncStorage,
  Linking
} from "react-native";

// styles
import styles from "./styles/RegisterAdsScreenStyles";
import colors from "../../styles/GlobalColors";

// api
import ApiAuth from "../../api/ApiAuth";

// components
import HeaderIn from "../../components/headerIn/HeaderIn";
import LineInput from "../../components/inputs/LineInput";
import RoundedButton from "../../components/buttons/RoundedButton";
import { ScrollView } from "react-native-gesture-handler";

import Spinner from "../../components/spinner/Spinner";
import Toast from "react-native-tiny-toast";


export default class FaleConosco extends Component {
  constructor(props) {
    super(props);
    this.state = {
       
    };
  }




  componentDidMount = () => {
   
  };
 
  render() {
    return (
      <View style={styles.container}>
         <HeaderIn
              title = {this.state.nome_empresa}
              leftIcon = { true } 
              goBack = {() => { this.props.navigation.goBack() }}
          />
        <ScrollView style={styles.scrollview}>
          <View style={styles.containerForm}>
         
         

            <View
              style={{
                width: "90%",
                marginTop: 10,
                color: colors.dark_blue,
                marginBottom: 50
              }}
            >
              <RoundedButton
                title="Chamar Whatsapp"
                style={{backgroundColor: 'green'}}
                onPress={() => {
                  Linking.openURL("https://api.whatsapp.com/send?&phone=+5511983358851");
                }}
              />
            </View>
          </View>
        </ScrollView>
        <Spinner title={"Aguarde"} show={this.state.spinner} />
      </View>
    );
  }
}
