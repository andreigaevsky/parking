import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    LayoutAnimation,
    Platform,
    UIManager,
    Image,
    Dimensions
} from "react-native";
const { width, height } = Dimensions.get('window');

export default class Accordian extends Component{

    constructor(props) {
        super(props);
        this.state = {
            item: props.data,
            expanded : false,
        };

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    render() {

        return (
            <View>
                <TouchableOpacity onPress={()=>this.toggleExpand()}>
                    <View style={styles.itemContainer}>
                        <View style={styles.item}>
                            <View style={{flexDirection: 'column', width: '85%'}}>
                                <Text numberOfLines={1} style={styles.itemText}>
                                    {this.state.item.address.substring(this.state.item.address.indexOf(',') + 2)}
                                </Text>
                                <Text numberOfLines={1} style={[styles.itemText, {fontSize: 15, color: '#7babdc'}]}>
                                    {this.state.item.address.substring(0, this.state.item.address.indexOf(','))}
                                </Text>
                            </View>
                            <View style={{
                                width: 70,
                                padding: 5,
                                borderColor: '#ffe19b',
                                borderWidth: 2,
                                borderRadius: 25,
                                alignItems: 'center',
                            }}>
                                <Text>
                                    <Text style={[styles.itemText, {fontWeight: 'bold'}]}>
                                        {this.state.item.freeSlotsCount}
                                    </Text>
                                    <Text style={styles.itemText}>
                                        {` / ${this.state.item.allSlotsCount}`}
                                    </Text>
                                </Text>
                            </View>
                        </View>
                        <View style={styles.border}/>
                    </View>
                </TouchableOpacity>
                {
                    this.state.expanded &&
                    <Image style={{width: width, height: height*0.4, resizeMode: 'contain'}} source={{uri: 'data:image/png;base64,'+this.state.item.image}}/>
                }

            </View>
        )
    }

    toggleExpand=()=>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({expanded : !this.state.expanded})
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
