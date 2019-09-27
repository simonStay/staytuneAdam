import React, { Component } from "react"
import { View, Text, ScrollView } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"

import styles from "./styles"

export interface Props {
  navigation: NavigationScreenProp<NavigationState>
}

class Splash extends Component<Props, {}> {
  componentDidMount() {
    let self = this
    setTimeout(function() {
      //console.log("Test")
      self.props.navigation.navigate("Login")
    }, 3000)
  }
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentStyle}>
          <Text style={styles.textStyle}>
            STAY<Text style={styles.subTextStyle}>TUNE</Text>
          </Text>
        </ScrollView>
      </View>
    )
  }
}

export default Splash
