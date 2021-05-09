import React, { Component } from 'react';
import {FlatList, View, Text, TextInput, default as Dimensions, TouchableOpacity, StyleSheet} from 'react-native';
import URL from '../constants/url'
import Colors from "../constants/Colors";
import FooterTabs from "../tabs/FooterTabs";
import Numbers from "../constants/Numbers";

export default class MainScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
        }
    }

    componentDidMount(): void {
        this._fetchNewData();
        setInterval(() => this._fetchNewData(), Numbers.UPDATE_INTERVAL);
    }
    _fetchNewData = () => {
        fetch(URL.API_URL+"/api/parking/all",).then((resp) => {
            if(resp.ok) {
               resp.json().then((json)=> {  this.setState({data: json} )});
            }else{
                console.log("ERROR Main");
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    getData = () => {
        return this.state.data;
    };

    render() {
        const d = [{key: 'Devin', freeSlotsCount: 10, allSlotsCount: 23, address: 'sosdfjgnskjdfcgfgffgfggfgnkjsngkjsndgkjsdnkjgnsdkjvBori'},
            {key: 'Dan', freeSlotsCount: 10, allSlotsCount: 23, address: 'Borisov'}];

        const screenProps = {getData: this.getData};

        return (
            <View style={styles.container}>
                <FooterTabs screenProps={screenProps}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

});
