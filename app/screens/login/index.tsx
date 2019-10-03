import React, { Component } from "react"
import { View, ScrollView, Image } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import { Wallpaper } from "../../components/wallpaper"
import { TextField } from "../../components/text-field"
import { Button } from "../../components/button"
import { Text } from "../../components/text"
import styles from "./styles"
import { color } from "../../theme"

interface Props {
  navigation: NavigationScreenProp<NavigationState>
}

class Login extends Component<Props, {}> {
  onSignUp() {
    this.props.navigation.navigate("Register")
  }
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Wallpaper style={styles.wallpaper} />
        <ScrollView contentContainerStyle={styles.contentStyle}>
          <Image style={styles.logo} source={require("../splash/logo.png")} />
          <Text style={styles.textStyle}>
            Hello! I'm StayTune, your personal travel assistant, may i have your email & password
          </Text>
          <TextField inputStyle={styles.inputStyle} placeholder="Enter your email" placeholderTextColor={color.placeholderText} />
          <TextField inputStyle={styles.inputStyle} placeholder="Enter your password" placeholderTextColor={color.placeholderText} />
          <Text
            style={styles.forgotPasswordText}
            onPress={() => {
              navigation.navigate("ForgotPassword")
            }}
          >
            Forgot Password ?
          </Text>
          <Button style={styles.button} onPress={() => navigation.navigate("ProfileInfo")}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </Button>
          <Button style={styles.button} onPress={this.onSignUp.bind(this)}>
            <Text style={styles.buttonText}>SIGNUP</Text>
          </Button>
        </ScrollView>
      </View>
    )
  }
}

export default Login