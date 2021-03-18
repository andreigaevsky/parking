import React, {Component} from 'react';
import {FlatList, View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {Container, Header, Item, Input, Icon, Button} from 'native-base';
import Colors from '../constants/Colors';
import Numbers from "../constants/Numbers";

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
            <View style={styles.itemContainer}>
                <View style={styles.item}>
                    <View style={{flexDirection: 'column', width: '85%'}}>
                        <Text numberOfLines={1} style={styles.itemText}>
                            {item.address.substring(item.address.indexOf(',') + 2)}
                        </Text>
                        <Text numberOfLines={1} style={[styles.itemText, {fontSize: 15, color: '#7babdc'}]}>
                            {item.address.substring(0, item.address.indexOf(','))}
                        </Text>
                    </View>
                    <View style={{width: 70, padding: 5, borderColor: '#ffe19b', borderWidth: 2, borderRadius: 25, alignItems: 'center', }}>
                        <Text>
                            <Text style={[styles.itemText, { fontWeight: 'bold'}]}>
                                {item.freeSlotsCount}
                            </Text>
                            <Text style={styles.itemText}>
                                {` / ${item.allSlotsCount}`}
                            </Text>
                        </Text>
                    </View>
                </View>
                <View style={styles.border} />
            </View>
        );
    };

    _keyExtractor = (item) => {
        return item.id + "";
    };

    render() {
        console.log(this.state)
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <Header searchBar rounded style={{backgroundColor: Colors.MAIN}} androidStatusBarColor={Colors.MAIN}>
                    <Item>
                        <Icon name="ios-search" />
                        <Input placeholder="Search" />
                    </Item>
                    <Button transparent>
                        <Text>Search</Text>
                    </Button>
                </Header>
                {this.state.data !== null ? <View style={{flex: 1}}>
                    <FlatList
                        data={this.state.data}
                        renderItem={this.renderItem}
                        keyExtractor={this._keyExtractor}
                    />
                </View> : <View style={{justifyContent: "center", flex: 1}}><ActivityIndicator size="large" /></View>
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
        alignSelf:"center",
        borderBottomWidth: 1,
        borderColor: '#e9f3fd',
    },
    itemContainer: {
        alignItems: 'flex-end'
    }

});