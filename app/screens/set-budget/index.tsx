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
import { color, dimensions, spacing } from "../../theme"

import { connect } from "react-redux"
import { setTravelPreferences, setBudgeInfo } from "../../redux/actions/travel"
import AnimatedLoader from "react-native-animated-loader"
import DatePicker from "react-native-datepicker"

interface Props {
  navigation: NavigationScreenProp<NavigationState>
  setBudgeInfo: any
  setTravelPreferences: any
  user: any
  travel: any
  daysRef: any
}
interface UserInformation {
  personsCount: any
  daysCount: any
  totalBudget: any
  city: any
  visible: boolean
  travelDate: any
}

interface extrainfo {
  noOfDaysInput: any
  totalBudgetInput: any
  cityInput: any
}

class SetBudget extends Component<Props, UserInformation, extrainfo> {
  state: UserInformation
  constructor(props: Props) {
    super(props)
    this.state = {
      personsCount: "",
      daysCount: "",
      totalBudget: "",
      city: "",
      travelDate: "",
      visible: this.props.travel.loader,
    }
    this.noOfDaysInput = React.createRef()
    this.totalBudgetInput = React.createRef()
    this.cityInput = React.createRef()
  }

  componentDidMount() {
    // alert(dimensions.width)
  }

  onLeft() {
    this.props.navigation.goBack()
  }

  validateNumbers(e) {
    var regex = /^[0-9]*(?:\.\d{1,2})?$/ // allow only numbers [0-9]
    return regex.test(e)
  }

  async onNext() {
    if (this.state.travelDate == "" || this.state.travelDate == null) {
      Alert.alert(
        "Stay Tune",
        "Please enter travel date",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false },
      )
    } else if (this.state.personsCount == "" || this.state.personsCount == null) {
      Alert.alert(
        "Stay Tune",
        "Please enter persons count",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false },
      )
    } else if (this.state.daysCount == "" || this.state.daysCount == null) {
      Alert.alert(
        "Stay Tune",
        "Please enter days count",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false },
      )
    } else if (this.state.totalBudget == "" || this.state.totalBudget == null) {
      Alert.alert(
        "Stay Tune",
        "Please enter total budget",
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
    } else if (!this.validateNumbers(this.state.personsCount)) {
      Alert.alert(
        "Stay Tune",
        "Not a valid person count, value should be in numeric",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false },
      )
    } else if (!this.validateNumbers(this.state.daysCount)) {
      Alert.alert(
        "Stay Tune",
        "Not a valid days count, value should be in numeric",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false },
      )
    } else if (!this.validateNumbers(this.state.totalBudget)) {
      Alert.alert(
        "Stay Tune",
        "Not a valid total budget, value should be in numeric",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false },
      )
    } else {
      let setTravelBudget = {
        selectedTravelPreferences: this.props.travel.selectedTravelPreferences,
        personsCount: parseInt(this.state.personsCount),
        daysCount: parseInt(this.state.daysCount),
        totalBudget: parseInt(this.state.totalBudget),
        city: this.state.city,
        userId: this.props.user.userProfileInfo.data.id,
        locationImage: "",
        travelDate: this.state.travelDate,
        selectedCategories: [],
      }
      try {
        await this.props.setBudgeInfo(setTravelBudget)
        await this.props.setTravelPreferences(setTravelBudget)
        if (this.props.travel.travelPreferenceInfo.status == "Success") {
          this.props.navigation.navigate("SetInitialInterest")
        } else {
          {
            /*This is Temporary solution */
          }
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
        console.log(error)
      }
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
        <KeyboardAwareScrollView
          ref="scrollView"
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
        >
          <Text style={styles.textStyle}>Select your travel date ?</Text>
          <DatePicker
            style={{
              borderWidth: 0,
              borderStyle: null,
              borderRadius: 10,
              marginBottom: spacing[3],
              //height: dimensions.height / 15.6,
              width: dimensions.width / 1.11,
              backgroundColor: "transparent",
              marginLeft: dimensions.width * 0.05,
            }}
            date={this.state.travelDate}
            mode="date"
            placeholder="Select travel date"
            format="DD-MM-YYYY"
            minDate={new Date()}
            //maxDate="2016-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            onDateChange={date => {
              this.setState({ travelDate: date })
            }}
            customStyles={{
              dateText: {
                color: color.textColor,
                fontSize: 19,
                fontFamily: "OpenSans",
              },
              placeholderText: {
                color: color.placeholderText,
                fontSize: 19,
                fontFamily: "OpenSans",
              },
              dateInput: {
                backgroundColor: color.background,
                top: 0,
                bottom: 0,
                height: dimensions.height / 15.6,
                //minHeight: 44,
                width: dimensions.width / 1.11,
                borderRadius: 10,
                color: color.textColor,
                fontSize: 19,
                marginTop: spacing[5],
                fontFamily: "OpenSans",
              },
            }}
          />

          <Text style={styles.textStyle}>How many persons are there in your travel ?</Text>
          <TextField
            style={{ paddingVertical: 0 }}
            inputStyle={styles.inputStyle}
            placeholder="Number of Persons"
            placeholderTextColor={color.placeholderText}
            onChangeText={value => this.setState({ personsCount: value })}
            value={this.state.personsCount}
            keyboardType="numeric"
            returnKeyType="done"
            onSubmitEditing={() => this.noOfDaysInput.current.focus()}
          />

          <Text style={styles.textStyle}>How many days you will travel ?</Text>
          <TextField
            forwardedRef={this.noOfDaysInput}
            style={{ paddingVertical: 0 }}
            inputStyle={styles.inputStyle}
            placeholder="Number of Days"
            //autoFocus={true}
            placeholderTextColor={color.placeholderText}
            onChangeText={value => this.setState({ daysCount: value })}
            value={this.state.daysCount}
            keyboardType="numeric"
            returnKeyType="done"
            onSubmitEditing={() => this.totalBudgetInput.current.focus()}
          />

          <Text style={styles.textStyle}>How much is your total budget for this travel ?</Text>
          <TextField
            forwardedRef={this.totalBudgetInput}
            style={{ paddingVertical: 0 }}
            inputStyle={styles.inputStyle}
            placeholder="Total Budget"
            placeholderTextColor={color.placeholderText}
            onChangeText={value => this.setState({ totalBudget: value })}
            value={this.state.totalBudget}
            keyboardType="numeric"
            returnKeyType="done"
            onSubmitEditing={() => this.cityInput.current.focus()}
          />

          <Text style={styles.textStyle}>For which city you want to travel ?</Text>
          <TextField
            forwardedRef={this.cityInput}
            style={{ paddingVertical: 0 }}
            inputStyle={styles.inputStyle}
            placeholder="City"
            returnKeyType="done"
            placeholderTextColor={color.placeholderText}
            onChangeText={value => this.setState({ city: value })}
            value={this.state.city}
            onSubmitEditing={this.onNext.bind(this)}
          />

          <Button style={styles.button} onPress={this.onNext.bind(this)}>
            <View style={styles.buttonLeft}>
              <Text style={styles.buttonText}>Next</Text>
            </View>
            <View style={styles.buttonRight}>
              <Icon icon={"back"} style={styles.icon} />
            </View>
          </Button>
        </KeyboardAwareScrollView>

        <AnimatedLoader
          visible={this.state.visible}
          overlayColor="rgba(255,255,255,0.75)"
          source={require("./../loader.json")}
          animationStyle={styles.lottie}
          speed={1}
        />
      </View>
    )
  }
}

export default connect(
  state => ({
    user: state.user,
    travel: state.travel,
  }),
  { setBudgeInfo, setTravelPreferences },
)(SetBudget)
