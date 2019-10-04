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
interface userDetails {
  email: string
  password: string
}

class Login extends Component<Props, userDetails> {
  constructor(props: Props) {
    super(props)
    this.state = { email: "", password: "" }
  }
  onSignUp() {
    this.props.navigation.navigate("Register")
  }
  Login() {
    alert("values" + JSON.stringify(this.state))
    this.props.navigation.navigate("ProfileInfo")
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
          <TextField
            inputStyle={styles.inputStyle}
            placeholder="Enter your email"
            placeholderTextColor={color.placeholderText}
            onChangeText={value => this.setState({ email: value })}
            value={this.state.email}
          />
          <TextField
            inputStyle={styles.inputStyle}
            placeholder="Enter your password"
            placeholderTextColor={color.placeholderText}
            secureTextEntry={true}
            onChangeText={value => this.setState({ password: value })}
            value={this.state.password}
          />
          <Text
            style={styles.forgotPasswordText}
            onPress={() => {
              navigation.navigate("ForgotPassword")
            }}
          >
            Forgot Password ?
          </Text>
          <Button style={styles.button} onPress={this.Login.bind(this)}>
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
