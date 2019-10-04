import React, { Component } from "react"
import { View } from "react-native"
import { NavigationScreenProp, NavigationState, ScrollView } from "react-navigation"
import styles from "./styles"
import { color } from "../../theme"

import { Wallpaper } from "../../components/wallpaper"
import { TextField } from "../../components/text-field"
import { Text } from "../../components/text"
import { Button } from "../../components/button"
import { Header } from "../../components/header"
import { GoldBarView } from "../../components/goldBar"

interface Props {
    navigation: NavigationScreenProp<NavigationState>
}
interface UserInformation {
    firstName: string
    lastName: string
    city: string
    state: string
    zip: string
}

class ProfileInfo extends Component<Props, UserInformation> {
    constructor(props: Props) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            city: "",
            state: "",
            zip: "",
        }
    }
    onSelectAvatar() {
        console.log("profileInfo" + JSON.stringify(this.state))
        const { navigation } = this.props
        navigation.navigate("SelectAvatar")
    }

    render() {
        const { navigation } = this.props
        return (
            <View style={styles.container}>
                <Wallpaper style={styles.wallpaper} />
                <Header
                    style={styles.header}
                    headerText={"PROFILE INFORMATION"}
                    titleStyle={styles.headerTitle}
                />
                <GoldBarView />
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <TextField
                        placeholder="First Name"
                        inputStyle={styles.textField}
                        placeholderTextColor={color.placeholderText}
                        onChangeText={value => this.setState({ firstName: value })}
                        value={this.state.firstName}
                    />
                    <TextField
                        placeholder="Last Name"
                        inputStyle={styles.textField}
                        placeholderTextColor={color.placeholderText}
                        onChangeText={value => this.setState({ lastName: value })}
                        value={this.state.lastName}
                    />
                    <TextField
                        placeholder="City"
                        inputStyle={styles.textField}
                        placeholderTextColor={color.placeholderText}
                        onChangeText={value => this.setState({ city: value })}
                        value={this.state.city}
                    />
                    <TextField
                        placeholder="State"
                        inputStyle={styles.textField}
                        placeholderTextColor={color.placeholderText}
                        onChangeText={value => this.setState({ state: value })}
                        value={this.state.state}
                    />
                    <TextField
                        placeholder="Zip"
                        inputStyle={styles.textField}
                        placeholderTextColor={color.placeholderText}
                        onChangeText={value => this.setState({ zip: value })}
                        value={this.state.zip}
                    />
                    <Button style={styles.button} onPress={this.onSelectAvatar.bind(this)}>
                        <Text style={styles.buttonText}>SELECT AVATAR</Text>
                    </Button>
                </ScrollView>
            </View>
        )
    }
}

export default ProfileInfo
