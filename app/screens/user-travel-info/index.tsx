import React, { Component } from "react"
import { View, Image } from "react-native"

import { NavigationScreenProp, NavigationState, ScrollView } from "react-navigation"
import styles from "./styles"
import { color, dimensions } from "../../theme"
import { Text } from "../../components/text"
import LinearGradient from "react-native-linear-gradient"

import { Tabs } from "../../components/tabs"
import { getUserDetails } from "../../redux/actions/user"
import { connect } from "react-redux"
import SavedLocations from "../saved-locations"

interface Props {
  navigation: NavigationScreenProp<NavigationState>
  tabId: any
  getUserDetails: any
  userInfo: any
}
interface UserInformation {
  selectedTabId: any
  fullName: string
  firstName: string
  lastName: string
  email: string
  city: string
  state: string
  zip: string
  profilePic: string
}

const profilePic =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlsjY5BTaQA9ourJ7KW1PDagYVjryOF51notG3PPlaPM3-3am30w"
const TabsList = [
  { id: 0, tab: "PROFILE INFO" },
  { id: 1, tab: "BUDGET INFO" },
  { id: 2, tab: "SAVED LOCATIONS" },
]

class UserTravelInfo extends Component<Props, UserInformation> {
  constructor(props: Props) {
    super(props)
    this.state = {
      selectedTabId: this.props.tabId == undefined ? 0 : this.props.tabId,
      profilePic: profilePic,
      fullName: "",
      firstName: "",
      lastName: "",
      email: "",
      city: "",
      state: "",
      zip: "",
    }
  }

  onSave() {
    alert("submit")
  }

  async componentDidMount() {
    try {
      let userDetails = await this.props.getUserDetails(
        this.props.userInfo.id,
        this.props.userInfo.token,
      )
      console.log("userDetails_profileinfoscreen", userDetails.payload)

      this.setState({
        profilePic: userDetails.payload.profilePic,
        fullName: userDetails.payload.firstname + " " + userDetails.payload.lastname,
        firstName: userDetails.payload.firstname,
        lastName: userDetails.payload.lastname,
        email: userDetails.payload.lastname,
        city: userDetails.payload.city,
        state: userDetails.payload.state,
        zip: userDetails.payload.zip,
      })
    } catch (error) {
      console.log("error_profileinfoscreen", error)
    }

    this.setState({
      selectedTabId: this.props.tabId,
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedTabId: nextProps.tabId,
    })
  }

  selectedTab(value) {
    this.setState({
      selectedTabId: value.id,
    })
    // console.log('onTab_123:', value)
  }

  renderProfileInfo() {
    let userInfoList = []
    let userDetails = [
      { key: "Email", value: this.state.email },
      { key: "City", value: this.state.city },
      { key: "State", value: this.state.state },
      { key: "Zip", value: this.state.zip },
    ]

    userDetails.map((res, i) => {
      userInfoList.push(
        <View>
          <View>
            <Text style={styles.userInfoUpperText}>{res.value}</Text>
            <Text style={styles.userInfoBottomText}>{res.key}</Text>
          </View>
          {i == userDetails.length - 1 ? null : <View style={styles.line}></View>}
        </View>,
      )
    })
    return <View style={{ marginTop: dimensions.height / 7.6 }}>{userInfoList}</View>
  }

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 0.0, y: 1.0 }}
          locations={[0, 0.5, 1]}
          colors={[color.primaryColor, color.primaryColor, "#00000010"]}
          style={{ width: dimensions.width, height: dimensions.width / 3.91 }}
        >
          <View style={styles.userContainer}>
            <View style={styles.leftContainer}>
              <View style={styles.profilePicView}>
                <Image source={{ uri: this.state.profilePic }} style={styles.profilePic} />
              </View>
            </View>
            <View style={styles.rightContainer}>
              <Text style={styles.nameText}>{this.state.fullName}</Text>
              {/* <Text style={styles.editText}>EDIT PROFILE</Text> */}
            </View>
          </View>
        </LinearGradient>
        <Tabs
          TabsList={TabsList}
          onPress={value => this.selectedTab(value)}
          selectedTabId={this.state.selectedTabId}
        />
        {this.state.selectedTabId == 0 ? (
          <ScrollView contentContainerStyle={{}}>{this.renderProfileInfo()}</ScrollView>
        ) : this.state.selectedTabId == 1 ? (
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.initialText}>COMING SOON....</Text>
          </ScrollView>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <SavedLocations />
          </ScrollView>
        )}
      </View>
    )
  }
}

export default connect(
  state => ({
    user: state.user,
    userInfo: state.user.login,
  }),
  {
    getUserDetails,
  },
)(UserTravelInfo)
