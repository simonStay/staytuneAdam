import React, { Component } from "react"
import { View, Image, Alert } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import styles from "./styles"
import { color } from "../../theme"
import { TextField } from "../../components/text-field"
import { Text } from "../../components/text"
import { Button } from "../../components/button"
import ImagePicker from "react-native-image-picker"

import { connect } from "react-redux"
import { getUserDetails, createUserProfile } from "../../redux/actions/user"
import AnimatedLoader from "react-native-animated-loader"

interface Props {
    navigation: NavigationScreenProp<NavigationState>
    getUserDetails: any
    user: any
    userInfo: any
    createUserProfile: any
    userDetails: any
}
interface UserInformation {
    avatarSource: any
    firstName: string
    lastName: string
    city: string
    state: string
    zip: string
}

const profilePic = "https://pipdigz.co.uk/p3/img/placeholder-square.png"
class EditProfile extends Component<Props, UserInformation> {
    constructor(props: Props) {
        super(props)
        this.state = {
            avatarSource: profilePic,
            firstName: "",
            lastName: "",
            city: "",
            state: "",
            zip: "",
        }
    }
    validateZip = zip => {
        return /^\d{5}(-\d{4})?$/.test(zip)
    }

    async componentDidMount() {
        console.log("user_info__info_123:", this.props.user)
        try {
            let userDetails = await this.props.getUserDetails(
                this.props.userInfo.id,
                this.props.userInfo.token,
            )
            console.log("getUserDetails______123", JSON.stringify(this.props.userDetails))
            await this.setState({
                avatarSource: this.props.userDetails.profilePic,
                firstName: this.props.userDetails.firstname,
                lastName: this.props.userDetails.lastname,
                city: this.props.userDetails.city,
                state: this.props.userDetails.state,
                zip: this.props.userDetails.zip,
            })
        } catch (error) {
            console.log("userinfo_123_error:", error)
        }
    }

    async componentWillReceiveProps(nextProps) {
        try {
            console.log("this.props.user.loader", this.props.user.loader)
            console.log("componentWillReceivePropsEdit_123", this.props.userInfo)
            await this.setState({
                avatarSource: this.props.userInfo.profilePic,
                firstName: nextProps.userProfileInfo.data.firstname,
                lastName: nextProps.userProfileInfo.data.lastname,
                city: nextProps.userProfileInfo.data.city,
                state: nextProps.userProfileInfo.data.state,
                zip: nextProps.userProfileInfo.data.zip,
            })
        } catch (error) {
            console.log("userinfo_123:", error)
        }
    }

    async onSave() {
        if (this.state.firstName == "" || this.state.firstName == null) {
            Alert.alert(
                "Stay Tune",
                "Please enter firstName",
                [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                { cancelable: false },
            )
        } else if (this.state.lastName == "" || this.state.lastName == null) {
            Alert.alert(
                "Stay Tune",
                "Please enter lastName",
                [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                { cancelable: false },
            )
        } else if (this.state.city == "" || this.state.city == null) {
            Alert.alert(
                "Stay Tune",
                "Please enter city",
                [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                { cancelable: false },
            )
        } else if (this.state.state == "" || this.state.state == null) {
            Alert.alert(
                "Stay Tune",
                "Please enter state",
                [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                { cancelable: false },
            )
        } else if (this.state.zip == "" || this.state.zip == null) {
            Alert.alert(
                "Stay Tune",
                "Please enter zip",
                [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                { cancelable: false },
            )
        } else if (!this.validateZip(this.state.zip)) {
            Alert.alert(
                "Stay Tune",
                "Please enter a valid zip code",
                [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                { cancelable: false },
            )
        } else {
            let userInfoObj = {
                firstname: this.state.firstName,
                lastname: this.state.lastName,
                city: this.state.city,
                state: this.state.state,
                zip: this.state.zip,
                userId: this.props.userInfo.id,
                token: this.props.userInfo.token,
                profilePic: this.state.avatarSource,
            }

            try {
                let editProfile = await this.props.createUserProfile(userInfoObj)
                console.log("createUserProfile_editprofile:", editProfile)
                if (editProfile.payload.status == "success") {
                    setTimeout(() => {
                        Alert.alert(
                            "Stay Tune",
                            editProfile.payload.message,
                            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                            { cancelable: false },
                        )
                    }, 100)
                } else {
                    setTimeout(() => {
                        Alert.alert(
                            "Stay Tune",
                            "Something went wrong",
                            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                            { cancelable: false },
                        )
                    }, 100)
                }
            } catch (error) {
                console.log("error_error:", error)
            }
        }
    }

    onSelectImage() {
        const options = {
            title: "Select Profile Pic",
            storageOptions: {
                skipBackup: true,
                path: "images",
            },
        }

        ImagePicker.showImagePicker(options, response => {
            try {
                console.log("Response = ", response)

                if (response.didCancel) {
                    console.log("User cancelled image picker")
                } else if (response.error) {
                    console.log("ImagePicker Error: ", response.error)
                } else if (response.customButton) {
                    console.log("User tapped custom button: ", response.customButton)
                } else {
                    const source = { uri: response.uri }

                    // You can also display the image using data:
                    // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                    console.log("sources_123:", source)
                    this.setState({ avatarSource: source })
                }
            } catch (error) {
                console.log("error_123:", error)
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true}>
                    <View style={styles.profilePicView}>
                        <Image style={styles.profilePic} source={{ uri: this.state.avatarSource }} />
                    </View>
                    {/* <TouchableOpacity onPress={this.onSelectImage.bind(this)}>
                        <Text style={styles.changeProfileText}>Change Profile</Text>
                    </TouchableOpacity> */}
                    <TextField
                        placeholder="First Name"
                        inputStyle={styles.textField}
                        placeholderTextColor={color.placeholderText}
                        onChangeText={value => this.setState({ firstName: value })}
                        value={this.state.firstName}
                    />
                    <TextField
                        placeholder="Last Name"
                        inputStyle={styles.textField}
                        placeholderTextColor={color.placeholderText}
                        onChangeText={value => this.setState({ lastName: value })}
                        value={this.state.lastName}
                    />
                    <TextField
                        placeholder="City"
                        inputStyle={styles.textField}
                        placeholderTextColor={color.placeholderText}
                        onChangeText={value => this.setState({ city: value })}
                        value={this.state.city}
                    />
                    <TextField
                        placeholder="State"
                        inputStyle={styles.textField}
                        placeholderTextColor={color.placeholderText}
                        onChangeText={value => this.setState({ state: value })}
                        value={this.state.state}
                    />
                    <TextField
                        placeholder="Zip"
                        inputStyle={styles.textField}
                        placeholderTextColor={color.placeholderText}
                        onChangeText={value => this.setState({ zip: value })}
                        value={this.state.zip}
                    />
                    <Button style={styles.button} onPress={this.onSave.bind(this)}>
                        <Text style={styles.buttonText}>SAVE</Text>
                    </Button>
                    <AnimatedLoader
                        visible={this.props.user.loader}
                        overlayColor="rgba(255,255,255,0.75)"
                        source={require("./../loader.json")}
                        animationStyle={styles.lottie}
                        speed={1}
                    />
                </KeyboardAwareScrollView>
            </View>
        )
    }
}

export default connect(
    state => ({
        user: state.user,
        userProfileInfo: state.user.userProfileInfo,
        userInfo: state.user.login,
        userDetails: state.user.userDetails,
    }),
    {
        getUserDetails,
        createUserProfile,
    },
)(EditProfile)
