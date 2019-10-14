import React, { Component } from "react"
import { View } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"

import MapView from "react-native-maps"
import Geolocation from "@react-native-community/geolocation"

interface Props {
  navigation: NavigationScreenProp<NavigationState>
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
          style={{ flex: 1 }}
          region={this.state.region}
          zoomEnabled={true}
          onRegionChange={this.onRegionChange.bind(this)}
          showsUserLocation={true}
        />
      </View>
    )
  }
}

export default MapScreen
