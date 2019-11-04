import React, { Component } from "react"
import { View, FlatList, TouchableOpacity, Image } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import styles from "./styles"
import { Text } from "../../components/text"
import { CardView } from "../../components/card-view"
import { travelPreferenceTypes, selectedTravelPreferences } from "../../redux/actions/travel"
import { connect } from "react-redux"
import AnimatedLoader from "react-native-animated-loader"
import _ from 'lodash';

interface Props {
  navigation: NavigationScreenProp<NavigationState>
  selectedTravelPreferences: any
  travel: any
  travelPreferenceTypes: any
  travelCategoriesList: any
  savedLocations: any
  getLocationInfo: any
}
interface savedLocationsInfo {
  visible: boolean
  savedLocations: any
}

class SavedLocations extends Component<Props, savedLocationsInfo> {
  constructor(props: Props) {
    super(props)
    this.state = {
      savedLocations: [],
      visible: this.props.travel.loader,
    }
  }

  async componentDidMount() {
    this.setState({
      savedLocations: await this.props.travel.savedLocations,
    })
  }

  onLocation(item) {
    this.props.getLocationInfo(item)
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={this.onLocation.bind(this, item)}>
        <CardView>
          <View style={styles.elevateView}>
            <Image source={require("./../../assests/austin.jpg")} style={styles.elevateView} />
          </View>
          <View style={styles.footer}>
            <View style={styles.footerRow}>
              <View style={styles.LeftFooter}>
                <Text style={styles.locationText}>City: {item.city}</Text>
              </View>
              <View style={styles.LeftFooter}>
                <Text style={styles.locationText}>Budget: ${item.totalBudget}</Text>
              </View>
            </View>
          </View>
        </CardView>
      </TouchableOpacity>
    )
  }

  render() {
    // console.log("savedLocations:" + JSON.stringify(this.state.savedLocations))
    return (
      <View style={styles.container}>
        {this.props.travel.savedLocations != undefined ? (
          <View style={{ marginHorizontal: 10 }}>
            <FlatList
              data={_.reverse(this.props.travel.savedLocations)}
              extraData={this.state}
              renderItem={this.renderItem.bind(this)}
            />
          </View>
        ) : null}
        <AnimatedLoader
          visible={this.props.travel.loader}
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
  {
    travelPreferenceTypes,
    selectedTravelPreferences,
  },
)(SavedLocations)
