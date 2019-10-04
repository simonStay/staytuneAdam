/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import "react-native-gesture-handler"

import { createAppContainer, createDrawerNavigator } from "react-navigation"

import { createStackNavigator } from "react-navigation-stack"
import Splash from "../screens/splash"
import Register from "../screens/register"
import Login from "../screens/login"
import ProfileInfo from "../screens/profile-info"
import SelectAvatar from "../screens/select-avatar"
import ForgotPassword from "../screens/forgot-password"
import MapScreen from "../screens/map"
// const MapScreenStack = createDrawerNavigator({
//   Home: {
//     screen: MapScreen,
//   },
// })

const stackNav = createStackNavigator(
  {
    Splash: { screen: Splash },
    Register: { screen: Register },
    Login: { screen: Login },
    ProfileInfo: { screen: ProfileInfo },
    SelectAvatar: { screen: SelectAvatar },
    ForgotPassword: { screen: ForgotPassword },
    MapScreen: { screen: MapScreen },
  },
  {
    initialRouteName: "Splash",
    headerMode: "none",
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
    navigationOptions: {
      gesturesEnabled: false,
      swipeEnabled: false,
    },
  },
)

export default createAppContainer(stackNav)
