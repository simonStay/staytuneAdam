import React, { Component } from "react"
import { View, FlatList, TouchableOpacity, ImageBackground, Image } from "react-native"
import { NavigationScreenProp, NavigationState, ScrollView } from "react-navigation"
import styles from "./styles"
import { Text } from "../../components/text"
import { Button } from "../../components/button"
import { Icon } from "../../components/icon"
import { travelCategories, selectedTravelCategories } from '../../redux/actions/travel';
import { connect } from "react-redux"

interface Props {
  navigation: NavigationScreenProp<NavigationState>
  selectedTravelCategories: any
  travelCategories: any
}
interface UserInformation {
  selectedCategoryList: any
  categoryId: any
}

const TravelCategories = [
  { id: 0, category: "Business", url: "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Falejandrocremades%2Ffiles%2F2018%2F07%2Fdesk-3139127_1920-1200x773.jpg" },
  { id: 1, category: "Shopping", url: "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fdam%2Fimageserve%2F1138257321%2F960x0.jpg%3Ffit%3Dscale" },
  { id: 2, category: "Adventure", url: "https://images.pexels.com/photos/372098/pexels-photo-372098.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
  { id: 3, category: "Family Friends", url: "https://thumbs.dreamstime.com/z/family-friends-sitting-dining-table-59872527.jpg" },
  { id: 4, category: "Museum", url: "https://www.liveriga.com/userfiles/images/ko-darit/muzeji-un-galerijas/visi-muzeji/latvijas-nacionalais-makslas-muzejs/5.jpg?w=780&mode=3:2|crop" },
  { id: 5, category: "Entertainment", url: "http://www.dailyentertainment.us/wp-content/uploads/2018/09/Hollywood-The-Entertainment-Capital-of-the-World.jpg" },
]

class TravelPreference extends Component<Props, UserInformation> {
  constructor(props: Props) {
    super(props)
    this.state = {
      categoryId: '',
      selectedCategoryList: []
    }
  }

  async componentDidMount() {
    // let categoriesList = await this.props.travelCategories()
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
    alert('onNext')
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
        <ImageBackground source={{ uri: item.url }} style={styles.listImage} >
          <View style={styles.transparentView} />
        </ImageBackground>
        <View style={styles.elevateView}>
          {ImageView}
          <Text style={styles.categoryText}>{item.category}</Text>
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
          data={TravelCategories}
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
    user: state.user
  }), {
    travelCategories,
    selectedTravelCategories
  }
)(TravelPreference)

