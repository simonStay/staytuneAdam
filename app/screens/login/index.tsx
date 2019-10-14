import React, { Component } from "react"
import { Image, Keyboard, Alert, View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import { Wallpaper } from "../../components/wallpaper"
import { TextField } from "../../components/text-field"
import { Button } from "../../components/button"
import { Text } from "../../components/text"
import styles from "./styles"
import { color } from "../../theme"
import { Login } from "../../redux/actions/user"
import { connect } from "react-redux"
import AnimatedLoader from "react-native-animated-loader"

interface Props {
  navigation: NavigationScreenProp<NavigationState>
}
interface userDetails {
  email: string
  password: string
  intialUser: any
  token: any
  userId: any
  user: any
  visible: boolean
}

class LoginScreen extends Component<Props, userDetails> {
  constructor(props: Props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      intialUser:
        this.props.navigation.state.params === undefined
          ? false
          : this.props.navigation.state.params.intialUser,
      token: "",
      userId: "",
      // visible: this.props.user.loader,
    }
  }

  // componentDidMount() {
  //   setInterval(() => {
  //     this.setState({
  //       visible: !this.state.visible,
  //     })
  //   }, 2000)
  // }

  onSignUp() {
    this.props.navigation.navigate("Register")
  }

  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }

  async onLogin() {
    Keyboard.dismiss()
    //console.log("values" + JSON.stringify(this.state))

    if (this.state.email == "") {
      Alert.alert(
        "Stay Tune",
        "Please enter email",
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
    } else if (this.state.password.length < 7) {
      Alert.alert(
        "Stay Tune",
        "password is invalid",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false },
      )
    } else {
      const { email, password } = this.state
      await this.props.Login(email, password)
      console.log("this.props.user.login", this.props.user.login)

      if (this.props.user.login == undefined || this.props.user.login == "undefined") {
        Alert.alert(
          "Stay Tune",
          "Invalid email or password.",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false },
        )
      } else {
        this.setState({
          userId: this.props.user.login.id,
          token: this.props.user.login.token,
        })
        if (
          this.props.user.login.profilePic == "" ||
          this.props.user.login.profilePic == undefined
        ) {
          this.props.navigation.navigate("ProfileInfo", {
            userId: this.state.userId,
            token: this.state.token,
          })
          this.setState({
            email: "",
            password: "",
          })
        } else {
          this.props.navigation.navigate("MainScreen", {
            userId: this.state.userId,
            token: this.state.token,
          })
          this.setState({
            email: "",
            password: "",
          })
        }
      }
    }
  }

  render() {
    const { navigation } = this.props
    const { visible } = this.state
    return (
      <View style={styles.container}>
        <Wallpaper style={styles.wallpaper} />
        <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true}>
          {/* <ScrollView contentContainerStyle={styles.contentStyle}> */}
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
            autoCapitalize="none"
          />
          <TextField
            inputStyle={styles.inputStyle}
            placeholder="Enter your password"
            placeholderTextColor={color.placeholderText}
            secureTextEntry={true}
            onChangeText={value => this.setState({ password: value })}
            value={this.state.password}
            autoCapitalize="none"
          />
          <Text
            style={styles.forgotPasswordText}
            onPress={() => {
              navigation.navigate("ForgotPassword")
            }}
          >
            Forgot Password ?
          </Text>
          <Button style={styles.button} onPress={this.onLogin.bind(this)}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </Button>
          <Button style={styles.button} onPress={this.onSignUp.bind(this)}>
            <Text style={styles.buttonText}>SIGNUP</Text>
          </Button>
          <AnimatedLoader
            visible={this.props.user.loader}
            overlayColor="rgba(255,255,255,0.75)"
            source={require("./../loader.json")}
            animationStyle={styles.lottie}
            speed={1}
          />
          {/* </ScrollView> */}
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

export default connect(
  state => ({
    user: state.user,
  }),
  {
    Login,
  },
)(LoginScreen)
