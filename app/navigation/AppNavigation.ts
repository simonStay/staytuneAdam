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
import { createDrawerNavigator } from 'react-navigation-drawer';
import Splash from "../screens/splash"
import Register from "../screens/register"
import Login from "../screens/login"
import ProfileInfo from "../screens/profile-info"
import SelectAvatar from "../screens/select-avatar"
import ForgotPassword from "../screens/forgot-password"
import MapScreen from "../screens/map"
import SideBar from '../screens/side-bar';

const DrawerNav = createDrawerNavigator(
  {
    MapScreen: { screen: MapScreen },
  },
  {
    contentComponent: SideBar,
    drawerPosition: 'left',
    useNativeAnimations: false,
    drawerBackgroundColor: '#ffffff',
    overlayColor: 0.76,
    contentOptions: {
      // activeBackgroundColor: 'transparent',
      // inactiveTintColor: 'transparent',
      // labelStyle: {
      //   fontSize: 15
      // }
    }
  }
);

const stackNav = createStackNavigator(
  {
    DrawerNav: { screen: DrawerNav },
    Splash: { screen: Splash },
    Register: { screen: Register },
    Login: { screen: Login },
    ProfileInfo: { screen: ProfileInfo },
    SelectAvatar: { screen: SelectAvatar },
    ForgotPassword: { screen: ForgotPassword },
    // MapScreen: { screen: MapScreen },
  },
  {
    initialRouteName: "DrawerNav",
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
