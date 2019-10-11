import React, { Component } from "react"
import { View, ScrollView, Image, Alert } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import { Wallpaper } from "../../components/wallpaper"
import { TextField } from "../../components/text-field"
import { Button } from "../../components/button"
import { Text } from "../../components/text"
import { Header } from "../../components/header"
import { connect } from "react-redux"
import styles from "./styles"
import { color } from "../../theme"

interface Props {
  navigation: NavigationScreenProp<NavigationState>
}

interface userDetails {
  password: string
  confirmPassword: string
}

class ChangePasswordScreen extends Component<Props, userDetails> {
  constructor(props: Props) {
    super(props)
    this.state = { password: "", confirmPassword: "" }
  }

  async handleSubmit() {
    // let OTPValue = await this.props.user.user.passwordCode.otp
    // console.log("user_otp", JSON.stringify(OTPValue))
    // if (OTPValue == this.state.OTP) {
    // } else {
    //   console.log("OTPValue", OTPValue, "_OTP", this.state.OTP)
    //   Alert.alert(
    //     "Stay Tune",
    //     "OTP is incorrect, please enter the correct OTP",
    //     [{ text: "OK", onPress: () => console.log("OK Pressed") }],
    //     { cancelable: false },
    //   )
    // }
    //this.props.navigation.navigate("Login")
  }
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Wallpaper style={styles.wallpaper} />
        <ScrollView contentContainerStyle={styles.contentStyle}>
          <Header style={styles.header} leftIcon={"back"} onLeftPress={() => navigation.goBack()} />
          <Image style={styles.logo} source={require("../splash/logo.png")} />
          <Text style={styles.textStyle}>
            Hello! I'm StayTune, your personal travel assistant, may i have your Password and
            Confirm Password
          </Text>
          <TextField
            inputStyle={styles.inputStyle}
            placeholder="Enter your password"
            placeholderTextColor={color.placeholderText}
            onChangeText={value => this.setState({ password: value })}
            value={this.state.OTP}
          />
          <TextField
            inputStyle={styles.inputStyle}
            placeholder="Enter your confirm password"
            placeholderTextColor={color.placeholderText}
            onChangeText={value => this.setState({ confirmPassword: value })}
            value={this.state.OTP}
          />
          <Button style={styles.button} onPress={this.handleSubmit.bind(this)}>
            <Text style={styles.buttonText}>SUBMIT</Text>
          </Button>
        </ScrollView>
      </View>
    )
  }
}

export default connect(
  state => ({
    user: state,
  }),
  {
    ChangePasswordScreen,
  },
)(ChangePasswordScreen)
