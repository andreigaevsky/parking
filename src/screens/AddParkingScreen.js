import React, { Component } from 'react';
import {FlatList, View, Text, TextInput, default as Dimensions, TouchableOpacity, StyleSheet, Keyboard} from 'react-native';
import Url from '../constants/url'
import Colors from "../constants/Colors";
import { showMessage, hideMessage } from "react-native-flash-message";


export default class LotsListScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            address: '',
            lat : '',
            lng: '',
            url: '',
        };
    }

    _saveNewParking = () => {
        let data = { address: this.state.address, lat: this.state.lat, lng: this.state.lng, url: this.state.url }

       fetch(Url.API_URL+"/api/parking/new", {method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)}).then((resp) => {
            if (resp.status === 200) {
                Keyboard.dismiss();
                this._clearInputs();
                showMessage({
                    message: "New parking stream created!",
                    backgroundColor: Colors.MAIN,
                    type: "info",
                });
                this.props.navigation.goBack();
            } else {
                console.log(resp)
                showMessage({
                    message: "ERROR: all fields must be filled",
                    backgroundColor: Colors.MAIN,
                    type: "error",
                });
            }
        })
    }

    _clearInputs = () =>{
        this.setState({url: '', address: '', lat: '', lng: ''})
    }

    onChangeText= (Usrname) => { this.setState({Usrname})}

    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.input}>New parking</Text>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                               placeholder="Address"
                               underlineColorAndroid='transparent'
                               onChangeText={(address) => this.setState({ address})}
                               value={this.state.address}
                               clearButtonMode='always'
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                               placeholder="MJPG stream url"
                               underlineColorAndroid='transparent'
                               onChangeText={(url) => this.setState({url})}
                               value={this.state.url}
                               clearButtonMode='always'
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                               placeholder="Latitude"
                               keyboardType='numeric'
                               underlineColorAndroid='transparent'
                               onChangeText={(lat) => this.setState({lat})}
                               value={this.state.lat}
                               clearButtonMode='always'
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                               placeholder="Longitude"
                               keyboardType='numeric'
                               underlineColorAndroid='transparent'
                               onChangeText={(lng) => this.setState({lng})}
                               value={this.state.lng}
                               clearButtonMode='always'
                    />
                </View>

                <TouchableOpacity style={styles.submitButtonText} onPress={() => this._saveNewParking()}>
                    <Text style={styles.signUpText}>Create</Text>
                </TouchableOpacity>

            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        margin: 15,
        fontSize: 40,
        marginBottom : 40,
        color : Colors.MAIN
    },
    submitButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        height: 60,
    },
    submitButtonText:{
        color: '#FFFFFF',
        backgroundColor: Colors.MAIN,
        width:350,
        height:45,
        borderRadius:10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    signUpText:{
        color: '#FFFFFF',
        alignItems: 'center'
    },
    inputContainer: {
        borderBottomColor: 'gray',
        backgroundColor: '#FFFFFF',
        borderRadius:5,
        borderBottomWidth: 1,
        width:350,
        height:45,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
})