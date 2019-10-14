import React, { Component } from "react"
import { Image, Keyboard, Alert, ScrollView, View } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import styles from "./styles"

import { Wallpaper } from "../../components/wallpaper"
import { TextField } from "../../components/text-field"
import { Text } from "../../components/text"
import { Button } from "../../components/button"
import { color } from "../../theme"

import { connect } from "react-redux"
import { signUp } from "../../redux/actions/user"
import PropTypes from "prop-types"
import AnimatedLoader from "react-native-animated-loader"

interface Props {
  navigation: NavigationScreenProp<NavigationState>
}
interface userDetails {
  fullName: string
  email: string
  password: string
  signUp?: () => void
  user: any
}

class Register extends Component<Props, userDetails> {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }
  constructor(props: Props) {
    super(props)
    this.state = {
      fullName: "",
      email: "",
      password: "",
    }
  }

  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }

  // validatPassword = (str) => {
  //   var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
  //   return re.test(str);
  // }

  async onSubmit() {
    Keyboard.dismiss()
    console.log("SIGNUP" + JSON.stringify(this.state))

    if (this.state.fullName == "") {
      Alert.alert(
        "Stay Tune",
        "Please enter fullName",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false },
      )
    } else if (this.state.email == "") {
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
    } else if (this.state.password == "") {
      Alert.alert(
        "Stay Tune",
        "Please enter password",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false },
      )
    } else if (this.state.password.length < 8 || this.state.password.length > 10) {
      Alert.alert(
        "Stay Tune",
        "Password range should between 8 and 10",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false },
      )
    } else {
      const { fullName, email, password } = this.state
      await this.props.signUp(fullName, email, password)
      if (this.props.user.status == "failed") {
        Alert.alert(
          "Stay Tune",
          this.props.user.message,
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false },
        )
      } else if (this.props.user.status == "success") {
        this.props.navigation.navigate("Login", {
          intialUser: true,
        })
        this.setState({
          fullName: "",
          email: "",
          password: "",
        })
      }
      console.log("state_user_123:", this.props.user)
      // this.props.navigation.navigate('Login')
    }
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Wallpaper style={styles.wallpaper} />
        <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true}>
          <Image style={styles.logo} source={require("../splash/logo.png")} />
          <Text style={styles.welcomeText}>
            Hello! I'm StayTune, your personal travel assistant, may i have your details?
          </Text>
          <TextField
            placeholder="Enter your full name"
            inputStyle={styles.textField}
            placeholderTextColor={color.placeholderText}
            onChangeText={value => this.setState({ fullName: value })}
            value={this.state.fullName}
            autoCapitalize="none"
          />
          <TextField
            placeholder="Enter your email"
            inputStyle={styles.textField}
            placeholderTextColor={color.placeholderText}
            onChangeText={value => this.setState({ email: value })}
            value={this.state.email}
            autoCapitalize="none"
          />
          <TextField
            placeholder="Enter your password"
            inputStyle={styles.textField}
            placeholderTextColor={color.placeholderText}
            onChangeText={value => this.setState({ password: value })}
            value={this.state.password}
            secureTextEntry={true}
            autoCapitalize="none"
          />
          <Button style={styles.button} onPress={this.onSubmit.bind(this)}>
            <Text style={styles.buttonText}>SUBMIT</Text>
          </Button>
          <AnimatedLoader
            visible={this.props.loader}
            overlayColor="rgba(255,255,255,0.75)"
            source={require("./../loader.json")}
            animationStyle={styles.lottie}
            speed={1}
          />
          <Text style={styles.bottomText}>
            Already have an account ?{" "}
            <Text
              onPress={() => {
                navigation.navigate("Login")
                this.setState({
                  fullName: "",
                  email: "",
                  password: "",
                })
              }}
              style={[styles.bottomText, { color: "#61cbff" }]}
            >
              Login now
            </Text>
          </Text>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

export default connect(
  state => ({
    user: state.user.register,
    loader: state.user.loader,
  }),
  {
    signUp,
  },
)(Register)
