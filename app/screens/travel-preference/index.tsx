import React, { Component } from "react"
import { View, FlatList, TouchableOpacity, ImageBackground, Image } from "react-native"
import { NavigationScreenProp, NavigationState, ScrollView } from "react-navigation"
import styles from "./styles"
import { Text } from "../../components/text"
import { Button } from "../../components/button"
import { Icon } from "../../components/icon"
import { travelPreferenceTypes, selectedTravelPreferences } from "../../redux/actions/travel"
import { connect } from "react-redux"
import ImageLoad from "react-native-image-placeholder"
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

const TravelCategories = [
  {
    id: 0,
    categoryname: "Business",
    categoryPic:
      "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Falejandrocremades%2Ffiles%2F2018%2F07%2Fdesk-3139127_1920-1200x773.jpg",
  },
  {
    id: 1,
    categoryname: "Shopping",
    categoryPic:
      "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fdam%2Fimageserve%2F1138257321%2F960x0.jpg%3Ffit%3Dscale",
  },
  {
    id: 2,
    categoryname: "Adventure",
    categoryPic:
      "https://images.pexels.com/photos/372098/pexels-photo-372098.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
  {
    id: 3,
    categoryname: "Family Friends",
    categoryPic: "https://thumbs.dreamstime.com/z/family-friends-sitting-dining-table-59872527.jpg",
  },
  {
    id: 4,
    categoryname: "Museum",
    categoryPic:
      "https://www.liveriga.com/userfiles/images/ko-darit/muzeji-un-galerijas/visi-muzeji/latvijas-nacionalais-makslas-muzejs/5.jpg?w=780&mode=3:2|crop",
  },
  {
    id: 5,
    categoryname: "Entertainment",
    categoryPic:
      "http://www.dailyentertainment.us/wp-content/uploads/2018/09/Hollywood-The-Entertainment-Capital-of-the-World.jpg",
  },
]

class TravelPreference extends Component<Props, categoriesInfo> {
  constructor(props: Props) {
    super(props)
    this.state = {
      categoryId: "",
      categoriesList: [],
      selectedPrefenceList: [],
      visible: this.props.travel.loader,
    }
  }

  async componentDidMount() {
    try {
      let listOfCategories = await this.props.travelPreferenceTypes()
      console.log("this.props.travelCategoriesList:", this.props.travel.loader)
      await this.setState(
        {
          categoriesList: this.props.travel.travelPreferenceTypes,
        },
        () => {
          this.setState({
            visible: this.props.travel.loader,
          })
        },
      )
    } catch (error) {
      console.log("error_TravelPreference:")
    }
  }

  async onSelectedPreference(preference) {
    console.log("preference", JSON.stringify(preference))
    let travelPreference = this.state.categoriesList
    let loopCount = 0
    travelPreference.map((res, i) => {
      loopCount = loopCount + 1
      if (res.name === preference.name) {
        if (res.selected) {
          this.state.selectedPrefenceList.map((res, i) => {
            if (res == preference.name) {
              this.state.selectedPrefenceList.splice(i, 1)
            }
          })
        } else {
          this.state.selectedPrefenceList.push(preference.name)
        }
        res.selected = !res.selected
      }
    })
    if (travelPreference.length === loopCount) {
      console.log("selected_123", JSON.stringify(travelPreference))
      this.setState({
        categoriesList: travelPreference,
      })
    }
    // let count = 0
    // if (this.state.selectedPrefenceList.length == 0) {
    //   this.state.selectedPrefenceList.push(preference.name)
    // } else {
    //   this.state.selectedPrefenceList.map((res, i) => {
    //     if (res == preference.name) {
    //       this.state.selectedPrefenceList.splice(i, 1)
    //       count = count + 1
    //     }
    //   })
    //   if (count == 0) {
    //     this.state.selectedPrefenceList.push(preference.name)
    //   }
    // }

    this.setState({ selectedPrefenceList: this.state.selectedPrefenceList })

    console.log("selectedPrefenceList_123:", this.state.selectedPrefenceList)

    await this.props.selectedTravelPreferences(this.state.categoriesList)
  }

  onNext() {
    this.props.navigation.navigate("SetBudget")
  }

  renderItem = ({ item }) => {
    console.log("item_123", JSON.stringify(item))
    //var count = 0
    var ImageView
    // this.state.selectedPrefenceList.map((res, i) => {
    //   if (res.selected == true) {
    //     ImageView = "true"
    //     count = count + 1
    //   }
    //   if (count === 0) {
    //     ImageView = ""
    //   }
    // })

    if (item.selected) {
      ImageView = (
        <Image source={require("./../../assests/check-circle.png")} style={styles.checkImage} />
      )
    } else {
      ImageView = <View />
    }
    return (
      <TouchableOpacity
        onPress={this.state.visible == false ? this.onSelectedPreference.bind(this, item) : null}
        activeOpacity={0.6}
      >
        <ImageLoad
          style={styles.listImage}
          loadingStyle={{ size: "large", color: "blue" }}
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
        {this.state.visible == false ? (
          <Text style={styles.textStyle}>
            Set your travel preference when travelling some where
          </Text>
        ) : null}
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
          </Button>
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
)(TravelPreference)
