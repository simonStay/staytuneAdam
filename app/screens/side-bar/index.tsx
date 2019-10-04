import React, { Component } from "react"
import { View, FlatList, Image } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import styles from "./styles"

import { Wallpaper } from "../../components/wallpaper"
import { Button } from "../../components/button"
import { Avatar } from "../../components/avatar"
import { Icon } from "../../components/icon"
import { Text } from "../../components/text"
import { GoldBarView } from "../../components/goldBar"


const profilePic = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlsjY5BTaQA9ourJ7KW1PDagYVjryOF51notG3PPlaPM3-3am30w";

const MenuItems = [
    { "id": 0, "type": 'Start a plan', "icon": 'startplan' },
    { "id": 1, "type": 'Itinerary suggestions', "icon": 'travelsuggestions' },
    { "id": 2, "type": 'Travel preference', "icon": 'startplan' },
    { "id": 3, "type": 'Digital Souvenir', "icon": 'startplan' },
    { "id": 4, "type": 'Find a Local Friend', "icon": 'localfriend' },
    { "id": 5, "type": 'Saved locations', "icon": 'savedlocation' },
    { "id": 6, "type": 'Budget', "icon": 'budget' },
    { "id": 7, "type": 'Signout', "icon": 'logout' },
]

interface Props {
    navigation: NavigationScreenProp<NavigationState>
}

interface sideMenuItems {
    profilePic: string
}

class SideBar extends Component<Props, sideMenuItems, {}> {

    renderItem = ({ item }) => {
        return (
            <View style={styles.row}>
                <Icon icon={item.icon} style={{
                    height: 20,
                    width: 20,
                    marginTop: 0,
                    marginRight: 7
                }} />
                <Text style={styles.itemText}>{item.type}</Text>
            </View>
        )
    }

    render() {
        const { navigation } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.profilePicOutterView}>
                    <View style={styles.profilePicView}>
                        <Image
                            source={{ uri: profilePic }}
                            style={styles.profilePic}
                        />
                    </View>
                </View>
                <View style={styles.buttonView}>
                    <GoldBarView style={styles.editProfileButton} >
                        <Text style={styles.editprofileText}>EDIT PROFILE</Text>
                    </GoldBarView>
                </View>
                <View style={styles.menuItemsView}>
                    <FlatList
                        data={MenuItems}
                        renderItem={this.renderItem.bind(this)}
                        scrollEnabled={false}
                    />
                </View>

            </View>
        )
    }
}

export default SideBar
