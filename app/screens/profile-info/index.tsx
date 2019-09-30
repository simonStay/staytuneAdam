import React, { Component } from "react"
import { View } from "react-native"
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

class ProfileInfo extends Component<Props, {}> {

    onSelectAvatar() {
        const { navigation } = this.props
        navigation.navigate('SelectAvatar')
    }

    render() {
        const { navigation } = this.props
        return (
            <View style={styles.container}>
                <Wallpaper style={styles.wallpaper} />
                <Header style={styles.header} headerText={"Profile Information"} titleStyle={styles.headerTitle} />
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <TextField placeholder="Full Name" inputStyle={styles.textField} />
                    <TextField placeholder="Last Name" inputStyle={styles.textField} />
                    <TextField placeholder="City" inputStyle={styles.textField} />
                    <TextField placeholder="State" inputStyle={styles.textField} />
                    <TextField placeholder="Zip" inputStyle={styles.textField} />
                    <Button style={styles.button} onPress={this.onSelectAvatar.bind(this)}>
                        <Text style={styles.buttonText}>SELECT AVATAR</Text>
                    </Button>
                </ScrollView>
            </View>
        )
    }
}

export default ProfileInfo
