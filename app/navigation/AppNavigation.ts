/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import "react-native-gesture-handler"

import { createAppContainer } from "react-navigation"

import { createStackNavigator } from "react-navigation-stack"
import Splash from "../screens/splash"
import Register from "../screens/register"

const stackNav = createStackNavigator(
  {
    Splash: { screen: Splash },
    Register: { screen: Register }
  },
  {
    initialRouteName: "Splash",
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false,
      swipeEnabled: false,
    },
  },
)

export default createAppContainer(stackNav)
