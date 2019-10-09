import React, { Component } from "react"
import { View, ScrollView, Image, Keyboard, Alert } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import { Wallpaper } from "../../components/wallpaper"
import { TextField } from "../../components/text-field"
import { Button } from "../../components/button"
import { Text } from "../../components/text"
import styles from "./styles"
import { color } from "../../theme"
import { Login } from "../../redux/actions/user"
import { connect } from 'react-redux';

interface Props {
  navigation: NavigationScreenProp<NavigationState>
}
interface userDetails {
  email: string
  password: string
}

class LoginScreen extends Component<Props, userDetails> {
  constructor(props: Props) {
    super(props)
    this.state = { email: "", password: "" }
  }
  onSignUp() {
    this.props.navigation.navigate("Register")
  }

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  async onLogin() {
    Keyboard.dismiss();
    //console.log("values" + JSON.stringify(this.state))

    if (this.state.email == "") {
      Alert.alert(
        'Stay Tune',
        'Please enter email',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
    } else if (this.state.password == "") {
      Alert.alert(
        'Stay Tune',
        'Please enter password',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
    } else {
      const { email, password } = this.state
      await this.props.Login(email, password);
      console.log("user_123", this.props.user)
      //this.props.navigation.navigate("ProfileInfo")
    }

    //this.props.navigation.navigate("ProfileInfo")
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
            autoCapitalize='none'
          />
          <TextField
            inputStyle={styles.inputStyle}
            placeholder="Enter your password"
            placeholderTextColor={color.placeholderText}
            secureTextEntry={true}
            onChangeText={value => this.setState({ password: value })}
            value={this.state.password}
            autoCapitalize='none'
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
    Login,
  }
)(LoginScreen);
