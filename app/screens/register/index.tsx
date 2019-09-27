import React, { Component } from "react"
import { View } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import styles from "./styles"

import { Wallpaper } from "../../components/wallpaper"

interface Props {
    navigation: NavigationScreenProp<NavigationState>
}

class Register extends Component<Props, {}> {
    render() {
        const { navigation } = this.props
        return (
            <View style={styles.container}>
                <Wallpaper style={{ flex: 1 }} />
            </View>
        )
    }
}

export default Register
