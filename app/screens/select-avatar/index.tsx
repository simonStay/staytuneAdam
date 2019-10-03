import React, { Component } from "react"
import { View, FlatList, Image } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import styles from "./styles"

import { Wallpaper } from "../../components/wallpaper"

import { Avatar } from "../../components/avatar"

import { Header } from "../../components/header"
let DATA = [
  {
    uri: "https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png",
  },
  {
    uri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQSlL7khGH-Z3o48IDosMRnocgQAMv7Dxg7qLwzb5vrWf8WR7vRA",
  },
  {
    uri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQSlL7khGH-Z3o48IDosMRnocgQAMv7Dxg7qLwzb5vrWf8WR7vRA",
  },
  {
    uri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlsjY5BTaQA9ourJ7KW1PDagYVjryOF51notG3PPlaPM3-3am30w",
  },
  {
    uri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9PZOT9dO001vXBd5ZNRdV6ogwmvueBXwfOx4q3lcxJKpTLMQ4",
  },
  {
    uri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQSlL7khGH-Z3o48IDosMRnocgQAMv7Dxg7qLwzb5vrWf8WR7vRA",
  },
]

interface Props {
  navigation: NavigationScreenProp<NavigationState>
}

class SelectAvatar extends Component<Props, {}> {
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Wallpaper style={styles.wallpaper} />
        <Header
          style={styles.header}
          headerText={"Select Avatar"}
          titleStyle={styles.headerTitle}
        />
        <FlatList
          data={DATA}
          numColumns={3}
          renderItem={({ item }) => (
            <Avatar style={styles.avatar}>
              <Image
                source={{
                  uri: item.uri,
                }}
                style={styles.avatarImage}
              />
            </Avatar>
          )}
        />
      </View>
    )
  }
}

export default SelectAvatar
