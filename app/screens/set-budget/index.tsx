import React, { Component } from "react"
import { View, Alert } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import styles from "./styles"
import { Wallpaper } from "../../components/wallpaper"
import { Header } from "../../components/header"
import { GoldBarView } from "../../components/goldBar"
import { Text } from "../../components/text"
import { Button } from "../../components/button"
import { TextField } from "../../components/text-field"
import { Icon } from "../../components/icon"
import { color } from "../../theme"

import { connect } from "react-redux"
import { setBudgetInfo } from "../../redux/actions/travel"

interface Props {
    navigation: NavigationScreenProp<NavigationState>
    setBudgetInfo: any
}
interface UserInformation {
    personsCount: any
    daysCount: any
    totalBudget: any
    city: any
}


class SetBudget extends Component<Props, UserInformation> {
    state: UserInformation
    constructor(props: Props) {
        super(props)
        this.state = {
            personsCount: '',
            daysCount: '',
            totalBudget: '',
            city: ''
        }
    }

    componentDidMount() {
        // alert(dimensions.width)
    }

    onLeft() {
        this.props.navigation.goBack()
    }

    validateNumbers(e) {
        var regex = /^[0-9]*(?:\.\d{1,2})?$/;    // allow only numbers [0-9] 
        return regex.test(e)
    }

    async onNext() {

        if (this.state.personsCount == '' || this.state.personsCount == null) {
            Alert.alert(
                "Stay Tune",
                "Please enter persons count",
                [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                { cancelable: false },
            )
        } else if (this.state.daysCount == '' || this.state.daysCount == null) {
            Alert.alert(
                "Stay Tune",
                "Please enter days count",
                [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                { cancelable: false },
            )
        } else if (this.state.totalBudget == '' || this.state.totalBudget == null) {
            Alert.alert(
                "Stay Tune",
                "Please enter total budget",
                [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                { cancelable: false },
            )
        } else if (this.state.city == '' || this.state.city == null) {
            Alert.alert(
                "Stay Tune",
                "Please enter city",
                [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                { cancelable: false },
            )
        } else if (!this.validateNumbers(this.state.personsCount)) {
            Alert.alert(
                "Stay Tune",
                "Not a valid person count, value should be in numeric",
                [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                { cancelable: false },
            )
        }
        else if (!this.validateNumbers(this.state.daysCount)) {
            Alert.alert(
                "Stay Tune",
                "Not a valid days count, value should be in numeric",
                [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                { cancelable: false },
            )
        }
        else if (!this.validateNumbers(this.state.totalBudget)) {
            Alert.alert(
                "Stay Tune",
                "Not a valid total budget, value should be in numeric",
                [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                { cancelable: false },
            )
        } else {
            let setTravelBudget = {
                personsCount: this.state.personsCount,
                daysCount: this.state.daysCount,
                totalBudget: this.state.totalBudget,
                city: this.state.city
            }
            await this.props.setBudgetInfo(setTravelBudget)
            this.props.navigation.navigate('SetInitialInterest')
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <Wallpaper style={styles.wallpaper} />

                <Header
                    style={styles.header}
                    headerText={"SET BUDGET"}
                    titleStyle={styles.headerTitle}
                    leftIcon={"back"}
                    onLeftPress={this.onLeft.bind(this)}
                />
                <GoldBarView />
                <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true}>
                    <View>
                        <Text style={styles.textStyle}>
                            How many persons are there in your travel ?
                    </Text>
                        <TextField
                            inputStyle={styles.inputStyle}
                            placeholder="Number of Persons"
                            placeholderTextColor={color.placeholderText}
                            onChangeText={value => this.setState({ personsCount: value })}
                            value={this.state.personsCount}
                            keyboardType='numeric'
                        />
                    </View>
                    <View>
                        <Text style={styles.textStyle}>
                            How many days you will travel ?
                    </Text>
                        <TextField
                            inputStyle={styles.inputStyle}
                            placeholder="Number of Days"
                            placeholderTextColor={color.placeholderText}
                            onChangeText={value => this.setState({ daysCount: value })}
                            value={this.state.daysCount}
                            keyboardType='numeric'
                        />
                    </View>
                    <View>
                        <Text style={styles.textStyle}>
                            How much is your total budget for this travel ?
                    </Text>
                        <TextField
                            inputStyle={styles.inputStyle}
                            placeholder="Total Budget"
                            placeholderTextColor={color.placeholderText}
                            onChangeText={value => this.setState({ totalBudget: value })}
                            value={this.state.totalBudget}
                            keyboardType='numeric'
                        />
                    </View>
                    <View>
                        <Text style={styles.textStyle}>
                            For which city you want to travel ?
                    </Text>
                        <TextField
                            inputStyle={styles.inputStyle}
                            placeholder="City"
                            placeholderTextColor={color.placeholderText}
                            onChangeText={value => this.setState({ city: value })}
                            value={this.state.city}
                        />
                    </View>
                    <Button style={styles.button} onPress={this.onNext.bind(this)}>
                        <View style={styles.buttonLeft}>
                            <Text style={styles.buttonText}>Next</Text>
                        </View>
                        <View style={styles.buttonRight}>
                            <Icon icon={"back"} style={styles.icon} />
                        </View>
                    </Button>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}

export default connect(
    state => ({
        user: state.user,
    }),
    { setBudgetInfo },
)(SetBudget)
