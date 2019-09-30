import React, { Component } from "react"
import { View } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import styles from "./styles"

import MapView from 'react-native-maps';
import { Header } from "../../components/header"

interface Props {
    navigation: NavigationScreenProp<NavigationState>
}

class MapScreen extends Component<Props, {}> {

    render() {
        const { navigation } = this.props
        return (
            <View style={{ flex: 1 }}>
                <Header style={styles.header} headerText={"STAY TUNE"} titleStyle={styles.headerTitle} />
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            </View >
        )
    }
}

export default MapScreen
