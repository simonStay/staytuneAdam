import React, { Component } from "react"
import { View, Image, TouchableOpacity } from "react-native"

import { NavigationScreenProp, NavigationState, ScrollView } from "react-navigation"
import styles from "./styles"
import { color, dimensions } from "../../theme"
import { Drawer } from "native-base"
import SideBar from "../side-bar/index"

import { Wallpaper } from "../../components/wallpaper"
import { TextField } from "../../components/text-field"
import { Text } from "../../components/text"
import { Button } from "../../components/button"
import { Header } from "../../components/header"
import LinearGradient from 'react-native-linear-gradient';

import { Tabs } from "../../components/tabs"

interface Props {
    navigation: NavigationScreenProp<NavigationState>
}
interface UserInformation {
    isOpen: boolean
    selectedTabId: any
    tabValue: any
    tabId: number
}

const profilePic = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlsjY5BTaQA9ourJ7KW1PDagYVjryOF51notG3PPlaPM3-3am30w";
const TabsList = [{ id: 0, tab: 'PROFILE INFO' }, { id: 1, tab: 'BUDGET INFO' }, { id: 2, tab: 'SAVED LOCATIONS' }];


class UserTravelInfo extends Component<Props, UserInformation> {
    constructor(props: Props) {
        super(props)
        this.state = {
            selectedTabId: 0
        }
    }
    onSave() {
        alert('submit')
    }

    componentDidMount() {
        this.setState({
            selectedTabId: this.props.tabId
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            selectedTabId: nextProps.tabId
        })
    }

    selectedTab(value) {
        this.setState({
            selectedTabId: value.id
        })
        // console.log('onTab_123:', value)
    }

    render() {
        const { navigation } = this.props
        return (
            <View style={styles.container}>
                <LinearGradient
                    start={{ x: 0.0, y: 0.0 }} end={{ x: 0.0, y: 1.0 }}
                    locations={[0, 0.5, 1]}
                    colors={[color.primaryColor, color.primaryColor, "#00000010"]}
                    style={{ width: dimensions.width, height: dimensions.height * 0.13 }}
                >
                    <View style={styles.userContainer}>
                        <View style={styles.leftContainer}>
                            <View style={styles.profilePicView}>
                                <Image
                                    source={{ uri: profilePic }}
                                    style={styles.profilePic}
                                />
                            </View>
                        </View>
                        <View style={styles.rightContainer}>
                            <Text style={styles.nameText}>RAVI RAM</Text>
                            {/* <Text style={styles.editText}>EDIT PROFILE</Text> */}
                        </View>
                    </View>

                </LinearGradient>
                <Tabs
                    TabsList={TabsList}
                    onPress={(value) => this.selectedTab(value)}
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
