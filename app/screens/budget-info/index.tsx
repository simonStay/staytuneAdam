import React, { Component } from "react"
import { View, FlatList, TouchableOpacity, Image, ScrollView } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import styles from "./styles"
import { Text } from "../../components/text"
import { connect } from "react-redux"
import AnimatedLoader from "react-native-animated-loader"
import { color, dimensions } from "../../theme";
import { CardView } from "../../components/card-view";
import { GoldBarView } from "../../components/goldBar"
import { AnimatedCircularProgress } from 'react-native-circular-progress';


interface Props {
  navigation: NavigationScreenProp<NavigationState>
  getBudgetInfo: any
}
interface budgetInfo {
  spent: any
}

var userBugetInfo = [
  {
    id: 0,
    day: 'Day 1',
    dayBudget: 600,
    meals: 300,
    entertainment: 300
  }, {
    id: 1,
    day: 'Day 2',
    dayBudget: 500,
    meals: 250,
    entertainment: 250
  }, {
    id: 2,
    day: 'Day 3',
    dayBudget: 600,
    meals: 300,
    entertainment: 300
  }, {
    id: 3,
    day: 'Day 4',
    dayBudget: 900,
    meals: 450,
    entertainment: 450
  },
]

class BudgetInfo extends Component<Props, budgetInfo> {
  constructor(props: Props) {
    super(props)
    this.state = {
      spent: 60
    }
  }

  onSelectDay(item) {
    this.props.getBudgetInfo(item)
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={this.onSelectDay.bind(this, item)}>
        <CardView>
          {/* <GoldBarView style={styles.cardHeader}> */}
          <View style={styles.cardHeader}>
            <Text style={styles.headerText}>{item.day}</Text>
          </View>
          {/* </GoldBarView> */}

          <View style={styles.cardBody}>
            <View style={{ flexDirection: 'column', justifyContent: 'space-evenly' }}>
              <Text style={styles.bodyText}>Meals </Text>
              <Text style={styles.bodyText}>Entertainment </Text>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'space-evenly' }}>

              <Text style={styles.bodyText}>: ${item.meals}</Text>
              <Text style={styles.bodyText}>: ${item.entertainment}</Text>
            </View>
          </View>
        </CardView>
      </TouchableOpacity >)
  }

  render() {
    return (
      <ScrollView>
        <View style={[styles.container, { marginBottom: dimensions.width * 0.06 }]}>
          <View style={styles.progressCircleView}>
            <View style={styles.leftContainer}>
              <AnimatedCircularProgress
                size={dimensions.width / 2.1}
                width={6}
                fill={this.state.spent}
                tintColor={color.primary}
                backgroundColor={color.primaryColor}
                rotation={0}>
                {
                  (spent) => (
                    <View style={styles.innerCircle}>
                      <Text style={styles.percentText}>
                        {this.state.spent}%
                </Text>
                      <Text style={styles.spentText}>SPENT</Text>
                    </View>

                  )
                }
              </AnimatedCircularProgress>
            </View>
            <View style={styles.rightContainer}>
              <View >
                <Text style={styles.totalBudgetText}>
                  Total Budget
                </Text>
                <Text style={styles.amountText}>$2600</Text>
              </View>
            </View>
          </View>

          <View style={{ marginHorizontal: 10 }}>
            <FlatList
              scrollEnabled={false}
              data={userBugetInfo}
              extraData={this.state}
              renderItem={this.renderItem.bind(this)}
            />
          </View>
        </View>
      </ScrollView>
    )
  }
}

export default connect(
  state => ({
    user: state.user,
    travel: state.travel,
  }),
  {},
)(BudgetInfo)
