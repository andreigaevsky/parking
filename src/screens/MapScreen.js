import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    ActivityIndicator,
    Platform,
    PermissionsAndroid,Text
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import isEqual from "lodash/isEqual";
import Numbers from "../constants/Numbers";

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 53.8918822;
const LONGITUDE = 27.5673057;
const LATITUDE_DELTA = 3;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class IndoorMap extends React.Component {
    constructor(props) {
        super(props);
        this.mounted = false;
        this.state = {
            myPosition: null,
            ready: false,
            data: null
        };
    }

    _setNewData = () => {
        this.setState({data: this.props.route.params.getData() || null});
    };

    _setInterval = () => {
        this._Interval = setInterval(() => this._setNewData(), Numbers.UPDATE_INTERVAL );
    };

    _unsetInterval = () => {
        clearInterval(this._Interval);
    };

    componentDidMount() {
        this.mounted = true;

        if (Platform.OS === 'android') {
            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            ).then(granted => {
                if (granted && this.mounted) {
                    this.watchLocation();
                }
            });
        } else {
            this.watchLocation();
        }
        this.setState({ready: true});

        this._setNewData();
        this._unsubscribeFocus = this.props.navigation.addListener('focus', () => {
            this._setInterval();
        });
        this._unsubscribeBlur = this.props.navigation.addListener('blur', () => {
            this._unsetInterval();
        });
    }


    watchLocation() {
        this.watchID = navigator.geolocation.watchPosition(
            position => {
                const myLastPosition = this.state.myPosition;
                const myPosition = position.coords;
                if (!isEqual(myPosition, myLastPosition)) {
                    this.setState({ myPosition });
                }
            },
            null,
            this.props.geolocationOptions
        );
    }


    componentWillUnmount() {
        this.mounted = false;
        this.setState({ready: false})
        if (this.watchID) {
            navigator.geolocation.clearWatch(this.watchID);
        }

        this._unsubscribeFocus();
        this._unsubscribeBlur();
    }

    renderMap = () => {
        return (
            <MapView
                showsUserLocation
                showsMyLocationButton
                provider={this.props.provider}
                style={styles.map}
                initialRegion={{
                    latitude: LATITUDE,
                    longitude: LONGITUDE,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}
                ref={map => {
                    this.map = map;
                }}
            >
                {this.state.data?.map((parking) => {
                    return (
                        <Marker
                            title={parking.address}
                            key={parking.id}
                            coordinate={{latitude: parseFloat(parking.lat),
                                longitude: parseFloat(parking.lng)}}
                            description={parking.allSlotsCount+''}
                        >
                            <View style={styles.circle}>
                                <Text style={styles.pinText}>{parking.freeSlotsCount}</Text>
                            </View>
                        </Marker>
                    );
                    }
                )}
            </MapView>
        );
    }

    render() {
        let component = this.state.data !== null ? this.renderMap() : <ActivityIndicator size="large" />;
        return (
            <View style={styles.container}>
                {component}
            </View>
        );
    }
}

IndoorMap.propTypes = {
    provider: MapView.ProviderPropType,
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFill,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom:50
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        backgroundColor: 'red',
    },
    pinText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10,
    },
});