import React, { Component } from "react"
import { View, ScrollView, Image, TouchableOpacity } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import { Wallpaper } from "../../components/wallpaper"
import { TextField } from "../../components/text-field"
import { Button } from "../../components/button"
import { Text } from "../../components/text"
import { Header } from "../../components/header"
import styles from "./styles"
import { color } from "../../theme"

interface Props {
  navigation: NavigationScreenProp<NavigationState>
}

interface userDetails {
  email: string
}

class ForgotPassword extends Component<Props, userDetails> {
  constructor(props: Props) {
    super(props)
    this.state = { email: "" }
  }
  handleSubmit() {
    alert("email" + JSON.stringify(this.state))
    this.props.navigation.navigate("Login")
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

export default ForgotPassword
