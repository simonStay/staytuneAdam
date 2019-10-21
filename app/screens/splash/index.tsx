import React, { Component } from "react"
import { View, Image } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import { connect } from "react-redux"

import styles from "./styles"

import { Wallpaper } from "../../components/wallpaper"

interface Props {
  navigation: NavigationScreenProp<NavigationState>
  user: any
}

class Splash extends Component<Props, {}> {
  componentDidMount() {
    let self = this
    setTimeout(function() {
      //console.log("Test")
      if (self.props.user.login !== undefined && self.props.user.login.verified !== undefined) {
        // alert("login")
        if (self.props.user.login.verified && self.props.user.login.profilePic != "") {
          self.props.navigation.navigate("MainScreen", {
            userId: self.props.user.login.id,
            token: self.props.user.login.token,
            tabId: 2,
          })
        } else {
          self.props.navigation.navigate("Login")
        }
      } else {
        // alert("else")
        self.props.navigation.navigate("Login")
      }
    }, 3000)
  }
  render() {
    return (
      <View style={styles.container}>
        <Wallpaper style={{ flex: 1 }} />
        <Image style={{ height: 300, width: 300 }} source={require("./logo.png")} />
      </View>
    )
  }
}

export default connect(
  state => ({
    user: state.user,
  }),
  {},
)(Splash)
