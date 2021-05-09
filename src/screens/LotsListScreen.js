import React, {Component} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import {Header, Title} from 'native-base';
import Colors from '../constants/Colors';
import Numbers from "../constants/Numbers";
import Accordian from "./LotItem";
const { width, height } = Dimensions.get('window');
export default class LotsListScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 1,
            data: null,
            ready: false
        }
    }

    _setInterval = () => {
        this._Interval = setInterval(() => this._setNewData(), Numbers.UPDATE_INTERVAL);
    };

    _unsetInterval = () => {
        clearInterval(this._Interval);
    };

    componentDidMount() {
        setTimeout(() => this._setNewData(), Numbers.GET_TIME)

        this._unsubscribeFocus = this.props.navigation.addListener('focus', () => {
            this._setInterval();
        });
        this._unsubscribeBlur = this.props.navigation.addListener('blur', () => {
            this._unsetInterval();
        });
    }

    componentWillUnmount() {
        this._unsubscribeFocus();
        this._unsubscribeBlur();
    };

    _setNewData = () => {
        this.setState({data: this.props.route.params.getData() || null}, () => this._setReady());
    };

    _setReady = () => {
        this.setState({ready: true});
    };

    renderItem = ({item}) => {
        return (
            <Accordian data={item} />
        );
    };

    _keyExtractor = (item) => {
        return item.id + "";
    };

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <Header style={{backgroundColor: Colors.MAIN}} androidStatusBarColor={Colors.MAIN}>
                    <Title style={{alignSelf: 'center'}}>Available Points</Title>
                </Header>
                {this.state.data !== null ? <View style={{flex: 1}}>
                    <FlatList
                        data={this.state.data}
                        renderItem={this.renderItem}
                        keyExtractor={this._keyExtractor}
                    />
                </View> : <View style={{justifyContent: "center", flex: 1}}><ActivityIndicator size="large"/></View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        height: 80,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '5%',

    },
    itemText: {
        fontSize: 17,
        maxWidth: '70%',
        color: '#516ca3'
    },
    border: {
        width: '95%',
        alignSelf: "center",
        borderBottomWidth: 1,
        borderColor: '#e9f3fd',
    },
    itemContainer: {
        alignItems: 'flex-end'
    }

});
