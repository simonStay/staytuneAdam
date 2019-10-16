import React, { Component } from "react"
import { View, FlatList, TouchableOpacity, ImageBackground, Image } from "react-native"
import { NavigationScreenProp, NavigationState, ScrollView } from "react-navigation"
import styles from "./styles"
import { Text } from "../../components/text"
import { Button } from "../../components/button"
import { Icon } from "../../components/icon"
import { travelCategories, selectedTravelCategories } from '../../redux/actions/travel';
import { connect } from "react-redux"
import { CachedImage } from 'react-native-cached-image';

interface Props {
  navigation: NavigationScreenProp<NavigationState>
  selectedTravelCategories: any
  travel: any
  travelCategories: any
  travelCategoriesList: any
}
interface categoriesInfo {
  selectedCategoryList: any
  categoryId: any
  categoriesList: any
}

class TravelPreference extends Component<Props, categoriesInfo> {
  constructor(props: Props) {
    super(props)
    this.state = {
      categoryId: '',
      categoriesList: [],
      selectedCategoryList: []
    }
  }

  async componentDidMount() {
    try {

      let listOfCategories = await this.props.travelCategories()
      console.log('this.props.travelCategoriesList:', this.props.travel.travelCategories)
      await this.setState({
        categoriesList: this.props.travel.travelCategories
      })
    } catch (error) {
      console.log('error_TravelPreference:')
    }
  }

  async onSelectedCategory(category) {
    let count = 0
    if (this.state.selectedCategoryList.length == 0) {
      this.state.selectedCategoryList.push(category)
    } else {
      this.state.selectedCategoryList.map((res, i) => {
        if (res.id == category.id) {
          this.state.selectedCategoryList.splice(i, 1)
          count = count + 1
        }
      })
      if (count == 0) {
        this.state.selectedCategoryList.push(category)
      }
    }
    this.setState({ selectedCategoryList: this.state.selectedCategoryList })

    let categories = this.state.selectedCategoryList
    await this.props.selectedTravelCategories(categories)

    // console.log("selectedCategoryList_123:", (this.state.selectedCategoryList))
  }

  onNext() {
    this.props.navigation.navigate('SetBudget')
  }

  renderItem = ({ item }) => {
    var count = 0;
    var ImageView;
    this.state.selectedCategoryList.map((res, i) => {
      if (res.id == item.id) {
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
      <TouchableOpacity onPress={this.onSelectedCategory.bind(this, item)} activeOpacity={0.6}>
        {/* <CachedImage
          source={{
            uri: 'https://example.com/path/to/your/image.jpg'
          }}
          style={styles.listImage}
        /> */}
        <ImageBackground source={{ uri: item.categoryPic }} style={styles.listImage} >
          <View style={styles.transparentView} />
        </ImageBackground>
        <View style={styles.elevateView}>
          {ImageView}
          <Text style={styles.categoryText}>{item.categoryname}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.textStyle}>
          Set your travel preference when travelling some where
        </Text>

        <FlatList
          data={this.state.categoriesList}
          extraData={this.state}
          renderItem={this.renderItem.bind(this)}
          numColumns={2}
        />
        {this.state.selectedCategoryList.length != 0 ? (
          <Button style={styles.button} onPress={this.onNext.bind(this)}>
            <View style={styles.buttonLeft}>
              <Text style={styles.buttonText}>Next</Text>
            </View>
            <View style={styles.buttonRight}>
              <Icon icon={"back"} style={styles.icon} />
            </View>
          </Button>) : (null)}

      </View>
    )
  }
}

export default connect(
  state => ({
    user: state.user,
    travel: state.travel
  }), {
    travelCategories,
    selectedTravelCategories
  }
)(TravelPreference)

