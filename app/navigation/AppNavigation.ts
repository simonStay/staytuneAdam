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
    ProfileInfo: { screen: ProfileInfo },
  },
  {
    contentComponent: SideBar,
    contentOptions: {
      activeTintColor: '#000000',
      inactiveTintColor: '#000000',
      activeBackgroundColor: '#ffffff',
      labelStyle: {
        fontSize: 15
      }
    }
  }
);

const stackNav = createStackNavigator(
  {
    DrawerNav,
    Splash: { screen: Splash },
    Register: { screen: Register },
    Login: { screen: Login },
    ProfileInfo: { screen: ProfileInfo },
    SelectAvatar: { screen: SelectAvatar },
    ForgotPassword: { screen: ForgotPassword },
    MapScreen: { screen: MapScreen }
  },
  {
    initialRouteName: "Splash",
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false,
      swipeEnabled: false
    },
  },

)



export default createAppContainer(stackNav)
