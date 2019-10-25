import React, { Component } from "react"
import { View, FlatList, TouchableOpacity, ImageBackground, Image } from "react-native"
import { NavigationScreenProp, NavigationState, ScrollView } from "react-navigation"
import styles from "./styles"
import { Text } from "../../components/text"
import { Button } from "../../components/button"
import { Icon } from "../../components/icon"
import { travelPreferenceTypes, selectedTravelPreferences } from '../../redux/actions/travel';
import { connect } from "react-redux"
import ImageLoad from 'react-native-image-placeholder';
import AnimatedLoader from "react-native-animated-loader"

interface Props {
  navigation: NavigationScreenProp<NavigationState>
  selectedTravelPreferences: any
  travel: any
  travelPreferenceTypes: any
  travelCategoriesList: any
}
interface categoriesInfo {
  selectedPrefenceList: any
  categoryId: any
  categoriesList: any
  visible: boolean
}

class TravelPreference extends Component<Props, categoriesInfo> {
  constructor(props: Props) {
    super(props)
    this.state = {
      categoryId: '',
      categoriesList: [],
      selectedPrefenceList: [],
      visible: this.props.travel.loader,
    }
  }

  async componentDidMount() {
    try {
      let listOfCategories = await this.props.travelPreferenceTypes()
      console.log('this.props.travelCategoriesList:', this.props.travel.loader)
      await this.setState({
        categoriesList: this.props.travel.travelPreferenceTypes
      }, () => {
        this.setState({
          visible: this.props.travel.loader
        })
      })
    } catch (error) {
      console.log('error_TravelPreference:')
    }
  }

  async onSelectedPreference(preference) {
    console.log('onSelectedPreference', JSON.stringify(preference))
    let count = 0
    if (this.state.selectedPrefenceList.length == 0) {
      this.state.selectedPrefenceList.push(preference.name)
    } else {
      this.state.selectedPrefenceList.map((res, i) => {
        if (res == preference.name) {
          this.state.selectedPrefenceList.splice(i, 1)
          count = count + 1
        }
      })
      if (count == 0) {
        this.state.selectedPrefenceList.push(preference.name)
      }
    }

    this.setState({ selectedPrefenceList: this.state.selectedPrefenceList })

    console.log("selectedPrefenceList_123:", (this.state.selectedPrefenceList))

    await this.props.selectedTravelPreferences(this.state.selectedPrefenceList)
  }

  onNext() {
    this.props.navigation.push('SetBudget')
  }

  renderItem = ({ item }) => {
    var count = 0;
    var ImageView;
    this.state.selectedPrefenceList.map((res, i) => {
      if (res == item.name) {
        ImageView = 'true';
        count = count + 1;
      }
      if (count === 0) {
        ImageView = '';
      }
    });

    if (ImageView == 'true') {
      ImageView = (<Image source={require("./../../assests/check-circle.png")} style={styles.checkImage} />)
    } else {
      ImageView = (<View />)
    }
    return (
      <TouchableOpacity onPress={this.state.visible == false ? this.onSelectedPreference.bind(this, item) : null} activeOpacity={0.6}>
        <ImageLoad
          style={styles.listImage}
          loadingStyle={{ size: 'large', color: 'blue' }}
          source={{ uri: item.image }}
          placeholderSource={require("./../../assests/placeholder-image.png")}
          placeholderStyle={styles.listImage}
        >
          <View style={styles.transparentView} />
        </ImageLoad>
        <View style={styles.elevateView}>
          {ImageView}
          <Text style={styles.categoryText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.visible == false ?
          (<Text style={styles.textStyle}>
            Set your travel preference when travelling some where
          </Text>)
          : null}
        <FlatList
          data={this.state.categoriesList}
          //data={TravelCategories}
          extraData={this.state}
          renderItem={this.renderItem.bind(this)}
          numColumns={2}
        />
        {this.state.selectedPrefenceList.length != 0 ? (
          <Button style={styles.button} onPress={this.onNext.bind(this)}>
            <View style={styles.buttonLeft}>
              <Text style={styles.buttonText}>Next</Text>
            </View>
            <View style={styles.buttonRight}>
              <Icon icon={"back"} style={styles.icon} />
            </View>
          </Button>) : (null)}
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
    travel: state.travel
  }), {
    travelPreferenceTypes,
    selectedTravelPreferences
  }
)(TravelPreference)

