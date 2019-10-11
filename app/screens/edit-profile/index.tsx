import React, { Component } from "react"
import { View, Image, TouchableOpacity } from "react-native"
import { NavigationScreenProp, NavigationState, ScrollView } from "react-navigation"
import styles from "./styles"
import { color } from "../../theme"
import { Drawer } from "native-base"
import SideBar from "../side-bar/index"

import { Wallpaper } from "../../components/wallpaper"
import { TextField } from "../../components/text-field"
import { Text } from "../../components/text"
import { Button } from "../../components/button"
import { Header } from "../../components/header"
import { GoldBarView } from "../../components/goldBar"
import ImagePicker from 'react-native-image-picker';

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
}

const profilePic = require('./../../assests/camplaceholderimg.jpeg')
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
    onSave() {
        alert('submit')
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
                    this.setState({
                        avatarSource: source,
                    });
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
                    <TouchableOpacity style={styles.profilePicView} onPress={this.onSelectImage.bind(this)}>
                        <Image
                            source={this.state.avatarSource}
                            style={styles.profilePic}
                        />
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

export default EditProfile
