import React, { Component } from "react"
import { View, Image, TouchableOpacity } from "react-native"
import { NavigationScreenProp, NavigationState, ScrollView } from "react-navigation"
import styles from "./styles"
import { color } from "../../theme"
import { Drawer } from "native-base"
import SideBar from "../side-bar/index"

import { Wallpaper } from "../../components/wallpaper"
import { TextField } from "../../components/text-field"
import { Text } from "../../components/text"
import { Button } from "../../components/button"
import { Header } from "../../components/header"
import { GoldBarView } from "../../components/goldBar"
import ImagePicker from 'react-native-image-picker';

interface Props {
    navigation: NavigationScreenProp<NavigationState>
}
interface UserInformation {
    isOpen: boolean
}

class TravelPreference extends Component<Props, UserInformation> {
    constructor(props: Props) {
        super(props)
        this.state = {
        }
    }
    onSave() {
        alert('submit')
    }

    render() {
        const { navigation } = this.props
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Text style={styles.initialText}>COMING SOON....</Text>
                </ScrollView>
            </View>
        )
    }
}

export default TravelPreference
