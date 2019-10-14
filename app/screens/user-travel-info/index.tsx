import React, { Component } from "react"
import { View, Image } from "react-native"

import { NavigationScreenProp, NavigationState, ScrollView } from "react-navigation"
import styles from "./styles"
import { color, dimensions } from "../../theme"
import { Text } from "../../components/text"
import LinearGradient from "react-native-linear-gradient"

import { Tabs } from "../../components/tabs"

interface Props {
  navigation: NavigationScreenProp<NavigationState>
  tabId: any
}
interface UserInformation {
  selectedTabId: any
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
      selectedTabId: 0,
    }
  }

  componentDidMount() {
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
  }

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 0.0, y: 1.0 }}
          locations={[0, 0.5, 1]}
          colors={[color.primaryColor, color.primaryColor, "#00000010"]}
          style={{ width: dimensions.width, height: dimensions.height * 0.13 }}
        >
          <View style={styles.userContainer}>
            <View style={styles.leftContainer}>
              <View style={styles.profilePicView}>
                <Image source={{ uri: profilePic }} style={styles.profilePic} />
              </View>
            </View>
            <View style={styles.rightContainer}>
              <Text style={styles.nameText}>RAVI RAM</Text>
            </View>
          </View>
        </LinearGradient>
        <Tabs
          TabsList={TabsList}
          onPress={value => this.selectedTab(value)}
          selectedTabId={this.state.selectedTabId}
        />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.initialText}>COMING SOON....</Text>
        </ScrollView>
      </View>
    )
  }
}

export default UserTravelInfo
