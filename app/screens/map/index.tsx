import React, { Component } from "react"
import { View, Text, TouchableOpacity, Image } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"

import MapView from "react-native-maps"
import { connect } from "react-redux"
import Geolocation from "@react-native-community/geolocation"
import { Button } from "../../components/button"
import { Icon } from "../../components/icon"
import styles from "./styles"

interface Props {
  navigation: NavigationScreenProp<NavigationState>
  handleSelectedValue: any
  travel: any
}
interface MapScreen {
  state: any
  region: any
}

class MapScreen extends Component<Props, MapScreen, {}> {
  constructor(props: Props) {
    super(props)
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    }
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(position => {
      console.log("position", JSON.stringify(position))
      this.setState({
        region: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
      })
    })

    Geolocation.watchPosition(position => {
      this.setState({
        region: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
      })
    })
  }

  onRegionChange(region) {
    this.setState({ region: region })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          ref="map"
          style={styles.map}
          region={this.state.region}
          zoomEnabled={true}
          onRegionChange={this.onRegionChange.bind(this)}
          showsUserLocation={true}
        >
          {/* <TouchableOpacity style={styles.startPlan}>
            <Text style={styles.Text}>Start your Plan</Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            onPress={this.props.handleSelectedValue.bind(this, "Travel preference")}
            style={styles.iconButton}
          >
            <View style={{ flex: 1 }}>
              <Image source={require("./button.png")} style={styles.iconImage} />
            </View>
          </TouchableOpacity> */}
        </MapView>
        {this.props.travel.savedLocations === undefined ||
        this.props.travel.savedLocations.length === 0 ? (
          <TouchableOpacity
            style={styles.startPlan}
            onPress={this.props.handleSelectedValue.bind(this, "Travel preference")}
          >
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={styles.left}>
                <Text style={styles.buttonText}>Start your plan</Text>
              </View>
              <View style={styles.right}>
                <Icon icon={"back"} style={styles.icon} />
              </View>
            </View>
          </TouchableOpacity>
        ) : null}
        {/* <Button
          style={styles.button}
          onPress={this.props.handleSelectedValue.bind(this, "Travel preference")}
        >
          <View style={styles.buttonLeft}>
            <Text style={styles.buttonText}>Next</Text>
          </View>
          <View style={styles.buttonRight}>
            <Icon icon={"back"} style={styles.icon} />
          </View>
        </Button> */}
      </View>
    )
  }
}

export default connect(
  state => ({
    travel: state.travel,
  }),
  {},
)(MapScreen)
