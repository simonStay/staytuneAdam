import React, { Component } from "react"
import { View, ScrollView, Image, Keyboard, Alert } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import { Wallpaper } from "../../components/wallpaper"
import { TextField } from "../../components/text-field"
import { Button } from "../../components/button"
import { Text } from "../../components/text"
import { Header } from "../../components/header"
import { ForgotPassword } from "../../redux/actions/user"
import { connect } from "react-redux"
import styles from "./styles"
import { color } from "../../theme"

interface Props {
  navigation: NavigationScreenProp<NavigationState>
}

interface userDetails {
  email: string
}

class ForgotPasswordScreen extends Component<Props, userDetails> {
  constructor(props: Props) {
    super(props)
    this.state = { email: "" }
  }
  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }
  async handleSubmit() {
    Keyboard.dismiss()
    if (this.state.email == "") {
      Alert.alert(
        "Stay Tune",
        "Please enter email",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false },
      )
    } else if (!this.validateEmail(this.state.email)) {
      Alert.alert(
        "Stay Tune",
        "Please enter valid email",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false },
      )
    } else {
      const { email } = this.state
      await this.props.ForgotPassword(email)
      //console.log("user_123", this.props.user)
      //this.props.navigation.navigate("ProfileInfo")
    }

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
            Hello! I'm StayTune, your personal travel assistant, may i have your email.
          </Text>
          <TextField
            inputStyle={styles.inputStyle}
            placeholder="Enter your email"
            placeholderTextColor={color.placeholderText}
            onChangeText={value => this.setState({ email: value })}
            value={this.state.email}
          />
          <Button style={styles.button}>
            <Text style={styles.buttonText} onPress={this.handleSubmit.bind(this)}>
              SUBMIT
            </Text>
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
    ForgotPassword,
  },
)(ForgotPasswordScreen)
