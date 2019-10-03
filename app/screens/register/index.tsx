import React, { Component } from "react"
import { View, Image } from "react-native"
import { NavigationScreenProp, NavigationState, ScrollView } from "react-navigation"
import styles from "./styles"

import { Wallpaper } from "../../components/wallpaper"
import { TextField } from "../../components/text-field"
import { Text } from "../../components/text"
import { Button } from "../../components/button"
import { color } from "../../theme"

interface Props {
    navigation: NavigationScreenProp<NavigationState>
}

class Register extends Component<Props, {}> {

    onSubmit() {
        this.props.navigation.navigate('ProfileInfo')
    }

    render() {
        const { navigation } = this.props
        return (
            <View style={styles.container}>
                <Wallpaper style={styles.wallpaper} />
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Image style={styles.logo} source={require('../splash/logo.png')} />
                    <Text style={styles.welcomeText}>Hello! I'm StayTune, your personal travel assistant, may i have your details?</Text>
                    <TextField placeholder="Enter your full name" inputStyle={styles.textField} placeholderTextColor={color.placeholderText} />
                    <TextField placeholder="Enter your email" inputStyle={styles.textField} placeholderTextColor={color.placeholderText} />
                    <TextField placeholder="Enter your password" inputStyle={styles.textField} placeholderTextColor={color.placeholderText} />
                    <Button style={styles.button} onPress={this.onSubmit.bind(this)}>
                        <Text style={styles.buttonText}>SUBMIT</Text>
                    </Button>
                    <Text style={styles.bottomText}>Already have an account ?  <Text onPress={() => { navigation.navigate('Login') }} style={[styles.bottomText, { color: '#61cbff' }]}>Login now</Text></Text>
                </ScrollView>
            </View >
        )
    }
}

export default Register
