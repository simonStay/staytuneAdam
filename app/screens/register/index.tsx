import React, { Component } from "react"
import { View, Image } from "react-native"
import { NavigationScreenProp, NavigationState, ScrollView } from "react-navigation"
import styles from "./styles"

import { Wallpaper } from "../../components/wallpaper"
import { TextField } from "../../components/text-field"
import { Text } from "../../components/text"
import { Button } from "../../components/button"

interface Props {
    navigation: NavigationScreenProp<NavigationState>
}

class Register extends Component<Props, {}> {

    render() {
        const { navigation } = this.props
        return (
            <View style={styles.container}>
                <Wallpaper style={{ flex: 1 }} />
                <ScrollView style={{ flex: 1 }}>
                    <Image style={{ height: 100, width: 100, marginTop: 100, alignSelf: 'center', marginVertical: 10 }} source={require('../splash/logo.png')} />
                    <Text style={{ fontSize: 21, color: 'black', textAlign: 'center' }}>Hello! I'm StayTune, your personal travel assistant, may i have your details?</Text>
                    <TextField placeholder="Enter your full name" inputStyle={styles.textField} />
                    <TextField placeholder="Enter your email" inputStyle={styles.textField} />
                    <TextField placeholder="Enter your password" inputStyle={styles.textField} />
                    <Button style={{ backgroundColor: 'orange', marginHorizontal: 20, height: 60, marginTop: 30 }} >
                        <Text style={{ fontSize: 21, textAlign: 'center', fontWeight: 'bold' }}>SUBMIT</Text>
                    </Button>
                    <Text style={{ fontSize: 19, color: 'black', textAlign: 'center', }}>Already have an account? <Text style={{ fontSize: 19, color: 'blue' }}>Login now</Text></Text>
                </ScrollView>
            </View>
        )
    }
}

export default Register
