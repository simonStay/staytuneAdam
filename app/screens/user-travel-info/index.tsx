import React, { Component } from "react"
import { View, Image } from "react-native"

import { NavigationScreenProp, NavigationState, ScrollView } from "react-navigation"
import styles from "./styles"
import { color, dimensions } from "../../theme"
import { Text } from "../../components/text"
import LinearGradient from "react-native-linear-gradient"

import { Tabs } from "../../components/tabs"
import { getUserDetails } from "../../redux/actions/user"
import { userSavedLocations } from "../../redux/actions/travel"

import { connect } from "react-redux"
import SavedLocations from "../saved-locations"
import BudgetInfo from "../budget-info"

import ImageLoad from 'react-native-image-placeholder';

interface Props {
    navigation: NavigationScreenProp<NavigationState>
    tabId: any
    userSavedLocations: any
    getUserDetails: any
    userInfo: any
    handleSelectedValue: any
    onRef: any
    user: any
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
    "https://leics-fire.gov.uk/wp-content/uploads/2017/04/person-placeholder-300x300.png"
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

    async componentDidMount() {
        console.log("this.props.user.userProfileInfo", this.props.user.userProfileInfo)
        try {
            let userDetails = await this.props.getUserDetails(
                this.props.user.userProfileInfo.data.id,
                this.props.userInfo.token,
            )
            console.log("userDetails_profileinfoscreen", userDetails.payload)
            console.log("this.props.user.userProfileInfo", this.props.user.userProfileInfo)

            this.setState({
                profilePic: this.props.user.userProfileInfo.data.profilePic,
                fullName:
                    this.props.user.userProfileInfo.data.firstname +
                    " " +
                    this.props.user.userProfileInfo.data.lastname,
                firstName: this.props.user.userProfileInfo.data.firstname,
                lastName: this.props.user.userProfileInfo.data.lastname,
                email: this.props.user.userProfileInfo.data.email,
                city: this.props.user.userProfileInfo.data.city,
                state: this.props.user.userProfileInfo.data.state,
                zip: this.props.user.userProfileInfo.data.zip,
            })
            let userId = this.props.user.userProfileInfo.data.id
            console.log("userId", userId)
            let getUserSavedLocations = await this.props.userSavedLocations(userId)
            console.log("getUserSavedLocations", getUserSavedLocations.payload.length)
            if (this.props.travel.loader == false && getUserSavedLocations.payload.length === 0) {
                // alert("zero")
                if (this.state.selectedTabId != 0 && this.state.selectedTabId != 1) {
                    setTimeout(() => {
                        this.props.handleSelectedValue()
                    }, 100)
                }
            }
        } catch (error) {

        }
    }

    componentWillUnmount() {
        // this.props.onRef(undefined)
    }

    selectedTab(value) {
        this.setState({
            selectedTabId: this.props.tabId,
        })

        this.setState({
            selectedTabId: value.id,
        })
        // console.log('onTab_123:', value)
    }

    onClickRow(item) {
        this.props.navigation.push("EditBudget", { "budgetInfo": item })
        // alert(JSON.stringify(item))
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
                <View style={{ marginHorizontal: dimensions.width * 0.03 }}>
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
                                <ImageLoad
                                    isShowActivity={false}
                                    style={styles.profilePic}
                                    borderRadius={styles.profilePic.borderRadius}
                                    loadingStyle={{ size: 'large', color: 'blue' }}
                                    source={{ uri: this.state.profilePic }}
                                    placeholderSource={require('./../../assests/person-placeholder.png')}
                                    placeholderStyle={styles.profilePic}
                                />
                            </View>
                        </View>
                        <View style={styles.rightContainer}>
                            <Text style={styles.nameText}>{this.state.fullName}</Text>
                            {/* <Text style={styles.editText}>EDIT PROFILE</Text>  */}
                        </View>
                    </View>
                </LinearGradient>
                <Tabs
                    TabsList={TabsList}
                    // tabItemColor={"orange"}
                    // separatorColor={"black"}
                    // selectedTabColor={"yellow"}
                    // selectedTabLineColor={"black"}
                    onPress={value => this.selectedTab(value)}
                    selectedTabId={this.state.selectedTabId}
                />
                {this.state.selectedTabId == 0 ? (
                    <ScrollView contentContainerStyle={{}}>{this.renderProfileInfo()}</ScrollView>
                ) : this.state.selectedTabId == 1 ? (
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        {/* <Text style={styles.initialText}>COMING SOON....</Text> */}
                        <BudgetInfo navigation={this.props.navigation} getBudgetInfo={this.onClickRow.bind(this)} />
                    </ScrollView>
                ) : (
                            <SavedLocations navigation={this.props.navigation} />
                        )}
            </View>
        )
    }
}

export default connect(
    state => ({
        user: state.user,
        userInfo: state.user.login,
        travel: state.travel,
    }),
    {
        getUserDetails,
        userSavedLocations,
    },
)(UserTravelInfo)
