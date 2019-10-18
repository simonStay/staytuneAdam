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
  selectedCategoryList: any
  categoryId: any
  categoriesList: any
  visible: boolean
}

const TravelCategories = [
  { id: 0, categoryname: "Business", categoryPic: "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Falejandrocremades%2Ffiles%2F2018%2F07%2Fdesk-3139127_1920-1200x773.jpg" },
  { id: 1, categoryname: "Shopping", categoryPic: "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fdam%2Fimageserve%2F1138257321%2F960x0.jpg%3Ffit%3Dscale" },
  { id: 2, categoryname: "Adventure", categoryPic: "https://images.pexels.com/photos/372098/pexels-photo-372098.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
  { id: 3, categoryname: "Family Friends", categoryPic: "https://thumbs.dreamstime.com/z/family-friends-sitting-dining-table-59872527.jpg" },
  { id: 4, categoryname: "Museum", categoryPic: "https://www.liveriga.com/userfiles/images/ko-darit/muzeji-un-galerijas/visi-muzeji/latvijas-nacionalais-makslas-muzejs/5.jpg?w=780&mode=3:2|crop" },
  { id: 5, categoryname: "Entertainment", categoryPic: "http://www.dailyentertainment.us/wp-content/uploads/2018/09/Hollywood-The-Entertainment-Capital-of-the-World.jpg" },
]

class TravelPreference extends Component<Props, categoriesInfo> {
  constructor(props: Props) {
    super(props)
    this.state = {
      categoryId: '',
      categoriesList: [],
      selectedCategoryList: [],
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

  async onSelectedCategory(category) {
    let selectedPreferences = []
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
    categories.map(async (res, i) => {
      selectedPreferences.push(res.name)
    })

    console.log("selectedCategoryList_123:", (selectedPreferences))

    await this.props.selectedTravelPreferences(selectedPreferences)

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
      <TouchableOpacity onPress={this.state.visible == false ? this.onSelectedCategory.bind(this, item) : null} activeOpacity={0.6}>
        <ImageLoad
          style={styles.listImage}
          loadingStyle={{ size: 'large', color: 'blue' }}
          source={{ uri: item.image }}
          placeholderSource={require("./../../assests/placeholder-image.png")}
          placeholderStyle={styles.listImage}
        >
          <View style={styles.transparentView} />
        </ImageLoad>


        {/* <ImageBackground source={{ uri: item.categoryPic }} style={styles.listImage} > */}
        {/* <View style={styles.transparentView} /> */}
        {/* </ImageBackground> */}


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
        {this.state.selectedCategoryList.length != 0 ? (
          <Button style={styles.button} onPress={this.onNext.bind(this)}>
            <View style={styles.buttonLeft}>
              <Text style={styles.buttonText}>Next</Text>
            </View>
            <View style={styles.buttonRight}>
              <Icon icon={"back"} style={styles.icon} />
            </View>
          </Button>) : (null)}
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
    travel: state.travel
  }), {
    travelPreferenceTypes,
    selectedTravelPreferences
  }
)(TravelPreference)

