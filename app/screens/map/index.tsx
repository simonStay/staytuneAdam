import React, { Component } from "react"
import { View } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import styles from "./styles"

import MapView from 'react-native-maps';
import { Header } from "../../components/header"
import { Drawer } from 'native-base';

import SideBar from "../side-bar/index"
import { GoldBarView } from "../../components/goldBar"

interface Props {
    navigation: NavigationScreenProp<NavigationState>
}

class MapScreen extends Component<Props, {}> {
    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
        }
    }

    // getInitialState() {
    //     return {
    //         region: {
    //             latitude: 37.78825,
    //             longitude: -122.4324,
    //             latitudeDelta: 0.0922,
    //             longitudeDelta: 0.0421,
    //         },
    //     };
    // }

    closeDrawer() {
        this.drawer._root.close();
    }

    onRegionChange(region) {
        this.setState({ region: region });
    }

    onLeft() {
        this.drawer._root.open();
    }

    render() {
        const { navigation } = this.props
        return (

            <View style={{ flex: 1 }}>
                <Header
                    style={styles.header}
                    headerText={"STAY TUNE"}
                    titleStyle={styles.headerTitle}
                    leftIcon={"menu"}
                    onLeftPress={this.onLeft.bind(this)} />
                <GoldBarView />
                <View style={{ flex: 1, overflow: 'hidden' }}>
                    <Drawer
                        openDrawerOffset={0.4}
                        panCloseMask={0.4}
                        ref={ref => {
                            this.drawer = ref;
                        }}
                        content={
                            <SideBar
                                navigation={this.props.navigation}
                            // onCloseMenu={params => this.closeDrawer(params)}
                            />
                        }
                        onClose={() => this.closeDrawer()}
                    >
                        <MapView
                            style={{ flex: 1 }}
                            region={this.state.region}
                            onRegionChange={this.onRegionChange.bind(this)}
                            showsUserLocation={true}
                        />
                    </Drawer>
                </View>
            </View >

        )
    }
}

export default MapScreen
