import React, { Component } from 'react';
import LotsListScreen from "../screens/LotsListScreen";
import MapScreen from "../screens/MapScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AddParkingScreen from "../screens/AddParkingScreen";
import Colors from "../constants/Colors";

const Tab = createBottomTabNavigator();

export default function MyTabs(props) {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: Colors.MAIN,
                showLabel: false,
                adaptive: true,
                style: { position: 'absolute' },
                keyboardHidesTabBar: true,

            }}
        >
            <Tab.Screen name="List" component={LotsListScreen} initialParams={{ getData: props.screenProps.getData }}
                        options={{
                            tabBarLabel: 'List',
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="view-list" color={color} size={size} />
                            ),
                        }}
            />
            <Tab.Screen name="Map" component={MapScreen} initialParams={{ getData: props.screenProps.getData }}
                        options={{
                            tabBarLabel: 'Map',
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="map" color={color} size={size} />
                            ),
                        }}
            />
            <Tab.Screen name="Add" component={AddParkingScreen}
                        options={{
                            tabBarLabel: 'add',
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="plus" color={color} size={size} />
                            ),
                        }}
            />
        </Tab.Navigator>
    );
}

