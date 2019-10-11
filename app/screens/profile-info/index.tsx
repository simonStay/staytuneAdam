import React, { Component } from "react"
import { View, Alert } from "react-native"
import { NavigationScreenProp, NavigationState, ScrollView } from "react-navigation"
import styles from "./styles"
import { color } from "../../theme"

import { Wallpaper } from "../../components/wallpaper"
import { TextField } from "../../components/text-field"
import { Text } from "../../components/text"
import { Button } from "../../components/button"
import { Header } from "../../components/header"
import { GoldBarView } from "../../components/goldBar"

import { connect } from 'react-redux';

interface Props {
    navigation: NavigationScreenProp<NavigationState>
}
interface UserInformation {
    firstName: string
    lastName: string
    city: string
    state: string
    zip: string
    userId: any
    token: any
    getUserDetails?: () => void
}

class ProfileInfo extends Component<Props, UserInformation> {
    constructor(props: Props) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            city: "",
            state: "",
            zip: "",
            userId: this.props.navigation.state.params === undefined ? "" : this.props.navigation.state.params.userId,
            token: this.props.navigation.state.params === undefined ? "" : this.props.navigation.state.params.token,
        }
    }

    validateZip = (zip) => {
        return /^\d{5}(-\d{4})?$/.test(zip);
    }

    onSelectAvatar() {
        console.log("profileInfo" + JSON.stringify(this.state))
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
            const { navigation } = this.props
            let userObj = {
                firstName: this.state.firstName,
                lastName: this.state.firstName,
                city: this.state.city,
                state: this.state.state,
                zip: this.state.zip,
                userId: this.state.userId,
                token: this.state.token
            }
            navigation.navigate("SelectAvatar", { userObj: userObj })
        }
    }

    // componentDidMount() {
    //     this.setState({
    //         userId: this.props.navigation.state.params.userId,
    //         token: this.props.navigation.state.params.token
    //     }, () => {

    //         this.props.getUserDetails(this.state.userId, this.state.token)
    //     })

    //     this.setState({
    //         firstName: "",
    //         lastName: "",
    //         city: "",
    //         state: "",
    //         zip: "",
    //     })

    //     console.log("componentDidMount_123:", this.props.user.userDetails)

    // }

    render() {
        const { navigation } = this.props
        return (
            <View style={styles.container}>
                <Wallpaper style={styles.wallpaper} />
                <Header
                    style={styles.header}
                    headerText={"PROFILE INFORMATION"}
                    titleStyle={styles.headerTitle}
                />
                <GoldBarView />
                <ScrollView contentContainerStyle={styles.scrollContainer}>
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
                    <Button style={styles.button} onPress={this.onSelectAvatar.bind(this)}>
                        <Text style={styles.buttonText}>SELECT AVATAR</Text>
                    </Button>
                </ScrollView>
            </View>
        )
    }
}

export default connect(
    state => ({
        user: state.user,
    })
)(ProfileInfo);

