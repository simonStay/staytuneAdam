import React, { Component } from "react"
import { View, Image, TouchableOpacity } from "react-native"
import { NavigationScreenProp, NavigationState, ScrollView } from "react-navigation"
import styles from "./styles"
import { color } from "../../theme"
import { Drawer } from "native-base"
import SideBar from "../side-bar/index"

import { Wallpaper } from "../../components/wallpaper"
import { TextField } from "../../components/text-field"
import { Text } from "../../components/text"
import { Button } from "../../components/button"
import { Header } from "../../components/header"
import { GoldBarView } from "../../components/goldBar"

import { Map } from "react-powerplug"

import EditProfile from "../edit-profile"
import MapScreen from "../map"
import ItinerarySuggestions from "../itinerary-suggestions"
import TravelPreference from "../travel-preference"
import DigitalSouvenir from "../digital-souvenir"
import FindLocalFriend from "../find-local-friend"
import UserTravelInfo from "../user-travel-info"
import { connect } from "react-redux"
import { Signout } from "../../redux/actions/user"


interface Props {
  navigation: NavigationScreenProp<NavigationState>
}
interface UserInformation {
  isOpen: boolean
  selectedValue: any
  headerTitle: any
  userObj: any
  avatarSource: string
  firstName: string
  lastName: string
  city: string
  state: string
  zip: string
  profilePic: string
  userProfileInfo: any
  Signout: () => void
}

class MainScreen extends Component<Props, UserInformation> {
  constructor(props: Props) {
    super(props)
    this.state = {
      // selectedValue: this.props.navigation.state.params === undefined ? 'Start a plan' : this.props.navigation.state.params,
      // headerTitle: this.props.navigation.state.params === undefined ? 'START A PLAN' : this.props.navigation.state.params, isOpen: false
      selectedValue: 'Start a plan',
      headerTitle: 'START A PLAN', isOpen: false,
      userObj: null,
      avatarSource: "",
      firstName: "",
      lastName: "",
      city: "",
      state: "",
      zip: "",
    }
  }

  onLeft() {
    if (this.state.isOpen) {
      this.drawer._root.close()
      this.setState({
        isOpen: false,
      })
    } else {
      this.drawer._root.open()
      this.setState({
        isOpen: true,
      })
    }
  }


  async closeDrawer(params) {
    if (params == "Edit Profile") {
      this.setState({
        selectedValue: "Edit Profile",
        headerTitle: "EDIT PROFILE",
      })
    } else if (params == "Start a plan") {
      this.setState({
        selectedValue: "Start a plan",
        headerTitle: "STAY TUNE",
      })
    } else if (params == "Itinerary suggestions") {
      this.setState({
        selectedValue: "Itinerary suggestions",
        headerTitle: "ITINERARY SUGGESTIONS",
      })
    } else if (params == "Travel preference") {
      this.setState({
        selectedValue: "Travel preference",
        headerTitle: "TRAVEL PREFERENCE",
      })
    } else if (params == "Digital Souvenir") {
      this.setState({
        selectedValue: "Digital Souvenir",
        headerTitle: "DIGITAL SOUVENIR",
      })
    } else if (params == "Find a Local Friend") {
      this.setState({
        selectedValue: "Find a Local Friend",
        headerTitle: "FIND A LOCAL FRIEND",
      })
    } else if (params == "Saved locations") {
      this.setState({
        selectedValue: "Saved locations",
        headerTitle: "",
      })
    } else if (params == "Budget") {
      this.setState({
        selectedValue: "Budget",
        headerTitle: "",
      })
    } else if (params == "Signout") {
      await this.props.Signout()
      this.props.navigation.navigate("Login")
    }
    this.drawer._root.close()
  }

  renderContanier() {
    if (this.state.selectedValue == 'Edit Profile') {
      return <EditProfile navigation={this.props.navigation} />
    } else if (this.state.selectedValue == 'Start a plan') {
      return <MapScreen navigation={this.props.navigation} />
    } else if (this.state.selectedValue == 'Itinerary suggestions') {
      return <ItinerarySuggestions navigation={this.props.navigation} />
    } else if (this.state.selectedValue == 'Travel preference') {
      return <TravelPreference navigation={this.props.navigation} />
    } else if (this.state.selectedValue == 'Digital Souvenir') {
      return <DigitalSouvenir navigation={this.props.navigation} />
    } else if (this.state.selectedValue == 'Find a Local Friend') {
      return <FindLocalFriend navigation={this.props.navigation} />
    } else if (this.state.selectedValue == 'Saved locations') {
      return <UserTravelInfo navigation={this.props.navigation} tabId={2} tabValue={'SAVED LOCATIONS'} />
    } else if (this.state.selectedValue == 'Budget') {
      return <UserTravelInfo navigation={this.props.navigation} tabId={1} tabValue={'BUDGET INFO'} />
    }
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Wallpaper style={styles.wallpaper} />
        {this.state.selectedValue == 'Saved locations' || this.state.selectedValue == 'Budget' ?
          (<Header
            style={styles.headerView}
            headerText={this.state.headerTitle}
            titleStyle={styles.headerTitle}
            leftIcon={"menu"}
            onLeftPress={this.onLeft.bind(this)}
          />)
          : (<View>
            <Header
              style={styles.header}
              headerText={this.state.headerTitle}
              titleStyle={styles.headerTitle}
              leftIcon={"menu"}
              onLeftPress={this.onLeft.bind(this)}
            />
            <GoldBarView />
          </View>)}
        <View style={{ flex: 1, overflow: "hidden" }}>
          <Drawer
            openDrawerOffset={0.36}
            panCloseMask={0.36}
            ref={ref => {
              this.drawer = ref
            }}
            content={
              <SideBar
                navigation={this.props.navigation}
                onCloseMenu={params => this.closeDrawer(params)}
                userProfileInfo={this.props.userProfileInfo}
              />
            }
            onClose={() => this.closeDrawer()}
          >
            {this.renderContanier()}
          </Drawer>
        </View>
      </View>
    )
  }
}

export default connect(
  state => ({
    user: state.user,
    userProfileInfo: state.user.userProfileInfo
  }), {
    Signout
  }
)(MainScreen);
