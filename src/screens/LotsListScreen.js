import React, { Component } from 'react';
import {FlatList, View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import { Container, Header, Item, Input, Icon, Button } from 'native-base';
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
        this._Interval = setInterval(() => this._setNewData(), Numbers.UPDATE_INTERVAL );
    };

    _unsetInterval = () => {
        clearInterval(this._Interval);
    };


    componentDidMount()  {
        setTimeout(() => this._setNewData(), Numbers.GET_TIME)


        this._unsubscribeFocus = this.props.navigation.addListener('focus', () => {
            this._setInterval();
        });
        this._unsubscribeBlur = this.props.navigation.addListener('blur', () => {
            this._unsetInterval();
        });
    }

    componentWillUnmount () {
        this._unsubscribeFocus();
        this._unsubscribeBlur();
    };

    _setNewData = () => {
        this.setState({data: this.props.route.params.getData() || null}, () => this._setReady());
    };

    _setReady = () => {
        this.setState({ready:true});
    };

    renderItem = ({item}) => {
        return (
            <View style={styles.itemContainer}>
            <View style={styles.item}>
                <Text numberOfLines={1} style={styles.itemText}>
                    {item.address}
                </Text>
                <Text>
                    <Text  style={[styles.itemText, {color: 'green', fontWeight: 'bold'}]}>
                        {item.freeSlotsCount}
                    </Text>
                    <Text style={styles.itemText}>
                        {` / ${item.allSlotsCount}`}
                    </Text>
                </Text>
            </View>
                <View style={styles.border}/>
                    </View>
        );
    };

    _keyExtractor = (item) => {
        return item.id+"";
    };

    render() {
console.log(this.state)
        return (
            <View style={{flex:1, backgroundColor:'white'}}>
                <Header searchBar rounded style={{backgroundColor: Colors.MAIN}} androidStatusBarColor={Colors.MAIN}>
                    <Item>
                        <Icon name="ios-search" />
                        <Input placeholder="Search" />
                        <Icon name="ios-car" />
                    </Item>
                    <Button transparent>
                        <Text>Search</Text>
                    </Button>
                </Header>
                {this.state.data !== null ? <View style={{flex:1}}>
                    <FlatList
                        data={this.state.data}
                        renderItem={this.renderItem}
                        keyExtractor={this._keyExtractor}
                    />
                </View> : <View style={{justifyContent: "center", flex:1}}><ActivityIndicator size="large"/></View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
   item: {
       height: 50,
       width: '100%',
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'space-between',
       paddingHorizontal: '5%',

   },
    itemText: {
        fontSize: 17,
        maxWidth: '70%'
    },
    border: {
       width:'95%',
        borderBottomWidth: 1,
        borderColor: '#e9e9e9',
    },
    itemContainer: {
       alignItems: 'flex-end'
    }

});