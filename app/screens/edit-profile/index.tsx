import React, { Component } from "react"
import { View, Image, TouchableOpacity, Alert } from "react-native"
import { NavigationScreenProp, NavigationState, ScrollView } from "react-navigation"
import styles from "./styles"
import { color } from "../../theme"
import { TextField } from "../../components/text-field"
import { Text } from "../../components/text"
import { Button } from "../../components/button"
import ImagePicker from 'react-native-image-picker';

import { connect } from "react-redux"
import { getUserDetails, createUserProfile } from "../../redux/actions/user"

interface Props {
    navigation: NavigationScreenProp<NavigationState>
}
interface UserInformation {
    avatarSource: string
    firstName: string
    lastName: string
    city: string
    state: string
    zip: string
    profilePic: string
}

const profilePic = 'https://pipdigz.co.uk/p3/img/placeholder-square.png'
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

    validateZip = (zip) => {
        return /^\d{5}(-\d{4})?$/.test(zip);
    }

    async onSave() {
        if (this.state.firstName == "" || this.state.firstName == null) {
            Alert.alert(
                'Stay Tune',
                'Please enter firstName',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
            );
        } else if (this.state.lastName == "" || this.state.lastName == null) {
            Alert.alert(
                'Stay Tune',
                'Please enter lastName',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
            );
        } else if (this.state.city == "" || this.state.city == null) {
            Alert.alert(
                'Stay Tune',
                'Please enter city',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
            );
        } else if (this.state.state == "" || this.state.state == null) {
            Alert.alert(
                'Stay Tune',
                'Please enter state',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
            );
        } else if (this.state.zip == "" || this.state.zip == null) {
            Alert.alert(
                'Stay Tune',
                'Please enter zip',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
            );
        } else if (!(this.validateZip(this.state.zip))) {
            Alert.alert(
                'Stay Tune',
                'Please enter a valid zip code',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
            );
        } else {

            let userInfoObj = {
                firstname: this.state.firstName,
                lastname: this.state.lastName,
                city: this.state.city,
                state: this.state.state,
                zip: this.state.zip,
                userId: this.props.userId,
                token: this.props.userToken,
                profilePic: this.state.avatarSource,
            }

            console.log("userInfoObj_123:", userInfoObj)
            await this.props.createUserProfile(userInfoObj)
            try {
                if (this.props.user.userProfileInfo.status == "sucess") {

                    this.props.navigation.navigate("MainScreen", {
                        userId: this.props.navigation.state.params.userObj.userId
                    })

                } else {
                    Alert.alert(
                        'Stay Tune',
                        'Something went wrong',
                        [
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: false },
                    );
                }
            } catch (error) {
                console.log('error:', error)
            }
        }
    }

    async componentDidMount() {
        await this.props.getUserDetails(this.props.userId, this.props.userToken)
        this.setState({
            avatarSource: this.props.user.userDetails.profilePic,
            firstName: this.props.user.userDetails.firstname,
            lastName: this.props.user.userDetails.lastname,
            city: this.props.user.userDetails.city,
            state: this.props.user.userDetails.state,
            zip: this.props.user.userDetails.zip,
        })
        console.log("getUserDetails_123", this.props.user.userDetails)
    }

    onSelectImage() {
        const options = {
            title: 'Select Profile Pic',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            try {
                console.log('Response = ', response);

                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    const source = { uri: response.uri };

                    // You can also display the image using data:
                    // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                    console.log('sources_123:', source)
                    this.setState({ avatarSource: source });
                }
            } catch (error) {
                console.log('error_123:', error)
            }
        });
    }

    render() {
        const { navigation } = this.props
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.profilePicView} >
                        <Image
                            style={styles.profilePic}
                            source={{ uri: this.state.avatarSource }}
                        />
                    </View>
                    <TouchableOpacity onPress={this.onSelectImage.bind(this)}>
                        <Text style={styles.changeProfileText}>Change Profile</Text>
                    </TouchableOpacity>
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
                </ScrollView>
            </View>
        )
    }
}

export default connect(
    state => ({
        user: state.user,
        userId: state.user.login.id,
        userToken: state.user.login.token
    }),
    {
        getUserDetails, createUserProfile,
    }
)(EditProfile);


