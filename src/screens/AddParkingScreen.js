import React, {Component} from 'react';
import {Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Url from '../constants/url'
import Colors from "../constants/Colors";
import {showMessage} from "react-native-flash-message";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Iconss from "react-native-vector-icons/FontAwesome5";

export default class LotsListScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            address: '',
            lat: '',
            lng: '',
            url: '',
        };
    }

    _saveNewParking = () => {
        let data = {address: this.state.address, lat: this.state.lat, lng: this.state.lng, url: this.state.url}

        fetch(Url.API_URL + "/api/parking/new", {
            method: 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then((resp) => {
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
                showMessage({
                    message: "ERROR: all fields must be filled",
                    backgroundColor: 'gray',
                    type: "error",
                });
            }
        })
    }

    _clearInputs = () => {
        this.setState({url: '', address: '', lat: '', lng: ''})
    }

    onChangeText = (Usrname) => {
        this.setState({Usrname})
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={{
                    backgroundColor: Colors.MAIN,
                    height: 200,
                    borderBottomLeftRadius: 14,
                    borderBottomEndRadius: 14,
                    paddingBottom: 20,
                    marginBottom: '-15%',
                    width: '100%'
                }}>
                    <Iconss name="parking" color={'white'} size={30} style={{alignSelf: 'center'}}/>
                    <Text style={{
                        color: 'white',
                        marginLeft: 10,
                        fontSize: 20,
                        justifyContent: "flex-end",
                        marginTop: "7%",
                        paddingLeft: "5%",
                        fontWeight: "bold",
                        height: 30
                    }}>Create new point</Text>
                    <Text style={{
                        color: 'white',
                        marginLeft: 10,
                        fontSize: 15,
                        paddingLeft: "5%",
                        marginTop: 10,
                        height: 25
                    }}>Use your data to create you own parking tracking point</Text>
                </View>
                <View style={{
                    backgroundColor: 'white',
                    width: '90%',
                    borderRadius: 20,
                    alignItems: 'center',
                    paddingVertical: 20
                }}>
                    <View style={styles.inputContainer}>
                        <MaterialCommunityIcons name="map-marker" color={'#747474'} size={25} style={{marginLeft: 5}}/>
                        <TextInput style={styles.inputs}
                                   placeholder="Address"
                                   underlineColorAndroid='transparent'
                                   onChangeText={(address) => this.setState({address})}
                                   value={this.state.address}
                                   clearButtonMode='always'
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <MaterialCommunityIcons name="cctv" color={'#747474'} size={25} style={{marginLeft: 5}}/>
                        <TextInput style={styles.inputs}
                                   placeholder="MJPG stream url"
                                   underlineColorAndroid='transparent'
                                   onChangeText={(url) => this.setState({url})}
                                   value={this.state.url}
                                   clearButtonMode='always'
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <MaterialCommunityIcons name="arrow-right" color={'#747474'} size={25} style={{marginLeft: 5}}/>
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
                        <MaterialCommunityIcons name="arrow-down" color={'#747474'} size={25} style={{marginLeft: 5}}/>
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


            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        alignItems: 'center',
        backgroundColor: '#dedfe3'
    },
    input: {
        margin: 15,
        fontSize: 40,
        marginBottom: 40,
        color: Colors.MAIN
    },
    submitButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        height: 60,
    },
    submitButtonText: {
        color: '#FFFFFF',
        backgroundColor: Colors.MAIN,
        width: 350,
        height: 45,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    signUpText: {
        color: '#FFFFFF',
        alignItems: 'center'
    },
    inputContainer: {
        backgroundColor: '#efefef',
        width: 350,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 5,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
})