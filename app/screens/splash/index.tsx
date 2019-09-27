import React, { Component } from "react"
import { View, Image } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import styles from "./styles"

import { Wallpaper } from "../../components/wallpaper"
import { Text } from "../../components/text"
import { createRequireFromPath } from 'module';

interface Props {
  navigation: NavigationScreenProp<NavigationState>
}

class Splash extends Component<Props, {}> {
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Wallpaper style={{ flex: 1 }} />
        <Image style={{ height: 300, width: 300 }} source={require('./logo.png')} />
      </View>
    )
  }
}

export default Splash
