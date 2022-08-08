import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Modal, Image, Text, Linking } from 'react-native';
import styles from './styles/CardProductsStyles';
import colors from '../../styles/GlobalColors';
import { Icon } from 'react-native-elements';
import { CachedImage } from 'react-native-cached-image';

export default class CardProducts extends Component {


     state = {
            modalVisible: false
        };
     
      
      
    static propTypes = {
        
        source: PropTypes.number,
        title: PropTypes.string,
        subtitle: PropTypes.string,
        link: PropTypes.string,
        imagem: PropTypes.string,
        location: PropTypes.string,
        changeBy: PropTypes.string,
        styles: PropTypes.object,
        containerImageStyle: PropTypes.object,
        imageStyle: PropTypes.object
    }


    onPress(image) {
      if(image)
        this.setState({ modalVisible: !this.state.modalVisible });
      }

    onPressLink(link) {
      if(link)
        Linking.openURL(link);
      }

    render() {
        return (
            <View style={styles.container}>

                <TouchableOpacity
                    onPress={() => this.onPress(this.props.imagem)}
                    style={this.props.styles}>

                    <View style={styles.navBar}>
                        <View style={styles.leftContainer}>
                            <Text style={[styles.text, { textAlign: 'left' }]}>
                                <Text style={{ fontWeight: 'bold' }}>{this.props.title}</Text>
                                {"\n"}
                                {"\n"}

                                <Text style={{ color: 'grey' }}>{this.props.subtitle}</Text>
                                {"\n"}
                                <Text>

                                </Text>
                            </Text>
                        </View>

                        <View style={styles.rightContainer}>
                            <View style={styles.rightIcon}>
                                <Text style={{ color: 'dark', fontWeight: 'bold' }}>R$ {this.props.valor}</Text>
                            </View>
                        </View>
                    </View>


                </TouchableOpacity>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    
                    >
                    <View style={styles.centeredView}>
                        <View style={{margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        height: "90%",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5}}>
<TouchableOpacity onPress={() => this.onPressLink(this.props.link)} >
                        <Image
                            onPress={ () => alert('ok') }
                            style={{ width: '100%', height: '100%' }}
                            resizeMode="contain"
                            source={{uri: "https://suburban.com.br/painel/theme/arquivos/"+ 
                            this.props.imagem,
                            }}
                        />
</TouchableOpacity>
                        <TouchableOpacity
                            style={{ 
                            borderRadius: 20,
                            
                            textAlign: 'center',
                            bottom: 15,
                            padding: 10,
                            elevation: 2, 
                            backgroundColor: "#000000" }}
                            onPress={() => {
                            this.setState({ modalVisible: !this.state.modalVisible });
                            }}
                        >
                            <Text style={{color: "#FFFFFF"}}>Fechar</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                    </Modal>

            </View>
        )
    }
}
