import React, { Component } from "react"
import { View, Text, TouchableOpacity, Image, Modal, ScrollView } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"

import MapView, { Marker } from "react-native-maps"
import { connect } from "react-redux"
import Geolocation from "@react-native-community/geolocation"
import { touristLocations } from "../../redux/actions/places"
import { Button } from "../../components/button"
import { Icon } from "../../components/icon"
import styles from "./styles"
import { filters } from "../filters/filters"
import { dimensions, color } from "../../theme"

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
  modalVisible: any
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
        modalVisible: false,
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

  componentWillReceiveProps(nextProps) {
    this.setState({ modalVisible: nextProps.modalVisible })
  }

  onRegionChange(region) {
    this.setState({ region: region })
  }

  onFilter(type) {
    alert("type_123:" + type)
  }

  renderFilters() {
    let filterList = []
    filters.map((res, i) => {
      filterList.push(
        <TouchableOpacity onPress={this.onFilter.bind(this, res.type)} style={{ justifyContent: 'space-between', margin: 10, backgroundColor: color.lightLine, borderRadius: 6 }}>
          <Text style={{ color: 'black', fontSize: 16, paddingVertical: 10, paddingHorizontal: 16 }}>{res.type}</Text>
        </TouchableOpacity>)
    })
    return (filterList)
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
          <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'black', opacity: 0.9, justifyContent: 'center', aligItems: 'center' }}>
            <View style={{ flex: 0.1 }}>
              <TouchableOpacity onPress={() => { this.setState({ modalVisible: false }) }}>
                <Icon icon={"cancel"} style={{ position: 'absolute', top: 0, right: 0, marginTop: 31, marginRight: 16 }} />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 0.9, flexDirection: 'row', flexWrap: "wrap" }}>
              <ScrollView contentContainerStyle={{ flex: 0.9, flexDirection: 'row', flexWrap: "wrap" }}>
                {this.renderFilters()}
              </ScrollView>
            </View>
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
  { touristLocations },
)(MapScreen)
