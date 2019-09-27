import React, { Component } from "react"
import { View, ScrollView } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import { TextField } from "../../components/text-field"
import { Button } from "../../components/button"
import { Text } from "../../components/text"
import styles from "./styles"

interface Props {
  navigation: NavigationScreenProp<NavigationState>
}

class Login extends Component<Props, {}> {
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentStyle}>
          <Text style={styles.textStyle}>
            Hello! I'm StayTune, your personal travel assistant, may i have your email & password
          </Text>
          <TextField inputStyle={styles.inputStyle} placeholder="Enter your email" />
          <TextField inputStyle={styles.inputStyle} placeholder="Enter your password" />
          <Text style={styles.forgotPasswordText}>forgot password?</Text>
          <Button style={styles.button}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </Button>
          <Button style={styles.button}>
            <Text style={styles.buttonText}>SIGNUP</Text>
          </Button>
        </ScrollView>
      </View>
    )
  }
}

export default Login
