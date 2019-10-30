import React, { Component } from "react"
import { View, Text, TouchableOpacity, Image, Modal } from "react-native"
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
  modalVisible: any
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
        modalVisible: false,
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

  componentWillReceiveProps(nextProps) {
    this.setState({ modalVisible: nextProps.modalVisible })
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

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={{ flex: 1, backgroundColor: 'black', opacity: 0.9 }}>

            <TouchableOpacity onPress={() => { this.setState({ modalVisible: false }) }}>
              <Icon icon={"cancel"} style={{ position: 'absolute', top: 0, right: 0, marginTop: 31, marginRight: 16 }} />
            </TouchableOpacity>

          </View>
        </Modal>
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
