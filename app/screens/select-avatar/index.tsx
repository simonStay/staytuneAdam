import React, { Component } from "react"
import { View, Image } from "react-native"
import { NavigationScreenProp, NavigationState, ScrollView } from "react-navigation"
import styles from "./styles"

import { Wallpaper } from "../../components/wallpaper"
import { TextField } from "../../components/text-field"
import { Text } from "../../components/text"
import { Button } from "../../components/button"
import { Header } from "../../components/header"

interface Props {
    navigation: NavigationScreenProp<NavigationState>
}

class SelectAvatar extends Component<Props, {}> {

    render() {
        const { navigation } = this.props
        return (
            <View style={styles.container}>
                <Wallpaper style={styles.wallpaper} />
                <Header style={styles.header} headerText={"Select Avatar"} titleStyle={styles.headerTitle} />
                <ScrollView contentContainerStyle={styles.scrollContainer}>

                </ScrollView>
            </View>
        )
    }
}

export default SelectAvatar
