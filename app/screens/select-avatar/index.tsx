import React, { Component } from "react"
import { View, FlatList, Image, Alert } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import styles from "./styles"

import { Wallpaper } from "../../components/wallpaper"
import { Button } from "../../components/button"
import { Avatar } from "../../components/avatar"
import { Text } from "../../components/text"
import { Header } from "../../components/header"
import { GoldBarView } from "../../components/goldBar"

import { connect } from "react-redux"
import { getAvatarImages, createUserProfile } from "../../redux/actions/user"

interface Props {
  navigation: NavigationScreenProp<NavigationState>
}

interface listOfAvatars {
  getAvatarImages?: () => void
  onSelect?: () => void
  avatarList: any
  avatarImagesList: any
  url: string
  selectedAvatarId: string
  userObj: any
  userInfoObj: any
  selectedAvatarUrl: string
}

class SelectAvatar extends Component<Props, listOfAvatars, {}> {
  constructor(props: Props) {
    super(props)
    this.state = {
      avatarImagesList: [],
      selectedAvatarId: "",
      selectedAvatarUrl: "",
    }
  }
  async componentDidMount() {
    await this.props.getAvatarImages()
    console.log("getAvatarImages_get:", this.props.avatarList)
    //console.log("userInfoObject_123:", this.props.navigation.state.params.userObj)
    this.setState({ avatarImagesList: this.props.avatarList })
  }

  async onSelect(item) {
    await this.setState({ selectedAvatarId: item.id, selectedAvatarUrl: item.url })
    console.log("selectedAvatarUrl:", this.state.selectedAvatarUrl)
  }

  async onSubmit() {
    if (this.state.selectedAvatarId == "") {
      Alert.alert(
        "Stay Tune",
        "Please Select Avatar",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false },
      )
    } else {
      let userInfoObj = {
        firstname: this.props.navigation.state.params.userObj.firstname,
        lastname: this.props.navigation.state.params.userObj.lastname,
        city: this.props.navigation.state.params.userObj.city,
        state: this.props.navigation.state.params.userObj.state,
        zip: this.props.navigation.state.params.userObj.zip,
        profilePic: this.state.selectedAvatarUrl,
        userId: this.props.navigation.state.params.userObj.userId,
      }

      console.log("userInfoObj_123:", userInfoObj)
      await this.props.createUserProfile(userInfoObj)
      try {
        if (this.props.user.userProfileInfo.status == "success") {
          this.props.navigation.navigate("MainScreen", {
            userId: this.props.navigation.state.params.userObj.userId,
          })
        } else {
          Alert.alert(
            "Stay Tune",
            "Something went wrong",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false },
          )
        }
      } catch (error) {
        console.log("error:", error)
      }
    }
  }

  renderItem({ item }) {
    if (item.id == this.state.selectedAvatarId) {
      var ViewType = (
        <Image source={require("./../../assests/check-circle.png")} style={styles.checkImage} />
      )
    } else {
      var ViewType = <View />
    }
    return (
      <View style={styles.avatarView}>
        {ViewType}
        <Avatar style={styles.avatarImage} onPress={this.onSelect.bind(this, item)}>
          <Image
            source={{
              uri: item.url,
            }}
            style={styles.avatarImage}
          />
        </Avatar>
      </View>
    )
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Wallpaper style={styles.wallpaper} />
        <Header
          style={styles.header}
          headerText={"SELECT AVATAR"}
          titleStyle={styles.headerTitle}
        />
        <GoldBarView />
        <FlatList
          data={this.state.avatarImagesList}
          extraData={this.state}
          numColumns={3}
          renderItem={this.renderItem.bind(this)}
        />
        <Button style={styles.button} onPress={this.onSubmit.bind(this)}>
          <Text style={styles.buttonText}>SUBMIT</Text>
        </Button>
      </View>
    )
  }
}

export default connect(
  state => ({
    avatarList: state.user.avatarImages,
    user: state.user,
  }),
  {
    getAvatarImages,
    createUserProfile,
  },
)(SelectAvatar)
