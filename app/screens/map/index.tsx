import React, { Component } from "react"
import { View, Text, TouchableOpacity, Image } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"

import MapView, { Marker } from "react-native-maps"
import { connect } from "react-redux"
import Geolocation from "@react-native-community/geolocation"
import { touristLocations } from "../../redux/actions/places"
import { Button } from "../../components/button"
import { Icon } from "../../components/icon"
import styles from "./styles"

interface Props {
  navigation: NavigationScreenProp<NavigationState>
  handleSelectedValue: any
  travel: any
  touristLocations: any
  Marker: any
}
interface MapScreen {
  state: any
  region: any
  touristLocations: any
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
      touristLocations: [],
    }
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(position => {
      //console.log("position", JSON.stringify(position))
      this.setState(
        {
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
        },
        async () => {
          let touristLocations = await this.props.touristLocations(this.state.region)
          // console.log("touristLocations_mount", JSON.stringify(touristLocations))
          this.setState({
            touristLocations: touristLocations.payload,
          })
        },
      )
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
          initialRegion={this.state.region}
        >
          {this.state.touristLocations.length > 0
            ? this.state.touristLocations.map(location => {
                return (
                  <MapView.Marker
                    coordinate={{
                      latitude: parseFloat(location.geometry.location.lat),
                      longitude: parseFloat(location.geometry.location.lng),
                    }}
                    image={location.icon}
                    title={location.name}
                  />
                )
              })
            : null}
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
  { touristLocations },
)(MapScreen)
