import React, { Component } from "react"
import { View, FlatList, Image, TouchableOpacity, ScrollView } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import styles from "./styles"

import { Wallpaper } from "../../components/wallpaper"
import { Button } from "../../components/button"
import { Avatar } from "../../components/avatar"
import { Icon } from "../../components/icon"
import { Text } from "../../components/text"
import { GoldBarView } from "../../components/goldBar"

import { connect } from "react-redux"

const profilePic = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlsjY5BTaQA9ourJ7KW1PDagYVjryOF51notG3PPlaPM3-3am30w";

const MenuItems = [
    { "id": 0, "type": 'Start a plan', "icon": 'startplan' },
    { "id": 1, "type": 'Itinerary suggestions', "icon": 'travelsuggestions' },
    { "id": 2, "type": 'Travel preference', "icon": 'preference' },
    { "id": 3, "type": 'Digital Souvenir', "icon": 'souvenir' },
    { "id": 4, "type": 'Find a Local Friend', "icon": 'localfriend' },
    { "id": 5, "type": 'Saved locations', "icon": 'savedlocation' },
    { "id": 6, "type": 'Budget', "icon": 'budget' },
    { "id": 7, "type": 'Signout', "icon": 'logout' },
]

interface Props {
    navigation: NavigationScreenProp<NavigationState>,
    onCloseMenu: any
}

interface sideMenuItems {
    profilePic: string
    userName: string
}

class SideBar extends Component<Props, sideMenuItems, {}> {
    constructor(props: Props) {
        super(props)
        this.state = {
            profilePic: profilePic,
            userName: ''
        }
    }

    async componentDidMount() {
        //console.log('nextProps_123:', nextProps.user.userDetails)
        try {
            let userDetails = await this.props.userInfo
            console.log('nextProps_123_component:', userDetails)
            if (userDetails.profilePic == undefined || userDetails.profilePic == "undefined") {
            } else {
                await this.setState({
                    profilePic: userDetails.profilePic,
                })
            }
            if (userDetails.firstname == undefined || userDetails.firstname == "undefined" &&
                userDetails.lastname == undefined || userDetails.lastname == "undefined") {
            } else {
                await this.setState({
                    userName: userDetails.firstname + ' ' + userDetails.lastname
                })
            }
        } catch (error) {
            console.log("error_123:", error)
        }

    }

    async componentWillReceiveProps(nextProps) {
        try {
            console.log('nextProps_123:', nextProps.userProfileInfo)
            if (nextProps.userProfileInfo.data.profilePic == undefined || nextProps.userProfileInfo.data.profilePic == "undefined") {

            } else {
                await this.setState({
                    profilePic: nextProps.userProfileInfo.data.profilePic
                })
            }
            if (nextProps.userProfileInfo.data.firstname == undefined || nextProps.userProfileInfo.data.firstname == "undefined" &&
                nextProps.userProfileInfo.data.lastname == undefined || nextProps.userProfileInfo.data.lastname == "undefined") {

            } else {
                await this.setState({
                    userName: nextProps.userProfileInfo.data.firstname + ' ' + nextProps.userProfileInfo.data.lastname
                })
            }
        } catch (error) {

        }
    }

    onEditProfile() {
        this.props.onCloseMenu('Edit Profile');
    }

    onSelectedValue(value) {
        if (value == 'Start a plan') {
            this.props.onCloseMenu('Start a plan')
        } else if (value == 'Start a plan') {
            this.props.onCloseMenu('Start a plan')
        } else if (value == 'Itinerary suggestions') {
            this.props.onCloseMenu('Itinerary suggestions')
        } else if (value == 'Travel preference') {
            this.props.onCloseMenu('Travel preference')
        } else if (value == 'Digital Souvenir') {
            this.props.onCloseMenu('Digital Souvenir')
        } else if (value == 'Find a Local Friend') {
            this.props.onCloseMenu('Find a Local Friend')
        } else if (value == 'Saved locations') {
            this.props.onCloseMenu('Saved locations')
        } else if (value == 'Budget') {
            this.props.onCloseMenu('Budget')
        } else if (value == 'Signout') {
            this.props.onCloseMenu('Signout')
        }
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={this.onSelectedValue.bind(this, item.type)}>
                <View style={styles.row}>
                    <Icon icon={item.icon} style={styles.itemIcon} />
                    <Text style={styles.itemText}>{item.type}</Text>
                </View>
                <View style={styles.line}></View>
            </TouchableOpacity>
        )
    }

    render() {
        const { navigation } = this.props
        return (

            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.profilePicOutterView}>
                        <View style={styles.profilePicView}>
                            <Image
                                source={{ uri: this.state.profilePic }}
                                style={styles.profilePic}
                            />
                        </View>
                    </View>

                    <Text style={styles.nameStyle}>{this.state.userName}</Text>
                    <View style={styles.buttonView}>

                        <TouchableOpacity onPress={this.onEditProfile.bind(this)}>
                            <GoldBarView style={styles.editProfileButton} >
                                <Text style={styles.editprofileText}>EDIT PROFILE</Text>
                            </GoldBarView>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.menuItemsView}>
                        <FlatList
                            data={MenuItems}
                            renderItem={this.renderItem.bind(this)}
                            scrollEnabled={false}
                        />
                    </View>
                </ScrollView>
            </View>

        )
    }
}

export default connect(
    state => ({
        user: state.user,
        userInfo: state.user.login
    }),
    {
    }
)(SideBar);


