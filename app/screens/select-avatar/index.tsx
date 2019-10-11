import React, { Component } from "react"
import { View, FlatList, Image } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import styles from "./styles"

import { Wallpaper } from "../../components/wallpaper"
import { Button } from "../../components/button"
import { Avatar } from "../../components/avatar"
import { Text } from "../../components/text"
import { Header } from "../../components/header"
import { GoldBarView } from "../../components/goldBar"

import { connect } from "react-redux"
import { getAvatarImages, selectAvatarImage } from "../../redux/actions/user"

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
}

class SelectAvatar extends Component<Props, listOfAvatars, {}> {
  constructor(props: Props) {
    super(props)
    this.state = {
      avatarImagesList: [],
      selectedAvatarId: ''
    }
  }
  async componentDidMount() {
    await this.props.getAvatarImages()
    // console.log("getAvatarImages_get:", this.props.avatarList)
    this.setState({ avatarImagesList: this.props.avatarList })
  }

  onSelect(item) {
    this.props.selectAvatarImage(item)
    this.setState({ selectedAvatarId: item.id })
  }

  renderItem({ item }) {
    if (item.id == this.state.selectedAvatarId) {
      var ViewType = (<View style={{ width: 60, height: 60, backgroundColor: 'blue' }}></View>)
    } else {
      var ViewType = (<View style={{ width: 60, height: 60, backgroundColor: 'orange' }}></View>)
    }
    return (
      <View>
        {ViewType}
        <Avatar style={styles.avatar} onPress={this.onSelect.bind(this, item)}>
          <Image
            source={{
              uri: item.url,
            }}
            style={styles.avatarImage}
          />
        </Avatar>
      </View>)
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
        <Button style={styles.button} onPress={() => navigation.navigate("MainScreen")}>
          <Text style={styles.buttonText}>SUBMIT</Text>
        </Button>
      </View>
    )
  }
}

export default connect(
  state => ({
    avatarList: state.user.avatarImages
  }),
  {
    getAvatarImages,
    selectAvatarImage
  }
)(SelectAvatar);

