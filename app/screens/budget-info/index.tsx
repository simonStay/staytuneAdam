import React, { Component } from "react"
import { View, FlatList, TouchableOpacity, Image, ScrollView } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import styles from "./styles"
import { Text } from "../../components/text"
import { connect } from "react-redux"
import { color, dimensions } from "../../theme";
import { CardView } from "../../components/card-view";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { getBudgetByTravelId } from "../../redux/actions/budget"

interface Props {
  navigation: NavigationScreenProp<NavigationState>
  getBudgetInfo: any
  travelBudget: any
  getBudgetByTravelId: any
  travelPreferenceId: any
  budget: any
  travel: any
}
interface budgetInfo {
  spent: any
  userBugetInfo: any
  totalBudget: any
  spentPercent: any
}

class BudgetInfo extends Component<Props, budgetInfo> {
  constructor(props: Props) {
    super(props)
    this.state = {
      spent: 0,
      userBugetInfo: null,
      totalBudget: '',
      spentPercent: 0
    }
  }

  async componentDidMount() {
    try {
      await console.log("getBudget_123:", this.props.budget.budgetByTravelId)
      await this.setState({
        spent: this.props.budget.budgetByTravelId.expBudget,
        totalBudget: this.props.budget.budgetByTravelId.totalBudget,
        userBugetInfo: this.props.budget.budgetByTravelId.budget,
        spentPercent: this.props.budget.budgetByTravelId.expBudget * 100 / this.props.budget.budgetByTravelId.totalBudget
      })
    } catch (error) {
      console.log("BudgetInfo_error_123:", error)
    }

  }

  async componentWillReceiveProps(nextProps) {
    console.log("UNSAFE_componentWillReceiveProps_123:", nextProps)
    try {
      await this.setState({
        spent: nextProps.budget.budgetByTravelId.expBudget,
        totalBudget: nextProps.budget.budgetByTravelId.totalBudget,
        userBugetInfo: nextProps.budget.budgetByTravelId.budget,
        spentPercent: nextProps.budget.budgetByTravelId.expBudget * 100 / nextProps.budget.budgetByTravelId.totalBudget
      })
    } catch (error) {
      console.log("error_componentWillReceiveProps_123:", nextProps)
    }

  }

  onSelectDay(item) {
    this.props.getBudgetInfo(item)
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={this.onSelectDay.bind(this, item)}>
        <CardView>
          <View style={styles.cardHeader}>
            <Text style={styles.headerText}>Day {item.day}</Text>
            <Text style={styles.dateText}>{item.date}</Text>
          </View>
          <View style={styles.cardBody}>
            <View style={{ flexDirection: 'column', justifyContent: 'space-evenly' }}>
              <Text style={styles.bodyText}>Meals </Text>
              <Text style={styles.bodyText}>Entertainment </Text>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'space-evenly' }}>

              <Text style={styles.bodyText}>: ${Math.round(item.meals)}</Text>
              <Text style={styles.bodyText}>: ${Math.round(item.entertainment)}</Text>
            </View>
          </View>
        </CardView>
      </TouchableOpacity >)
  }

  render() {
    console.log("spentPercent_123:", this.state.totalBudget + ",,,,,,," + this.state.spent)
    return (
      <ScrollView>
        {this.props.budget.budgetByTravelId == undefined ?
          (<View style={[styles.container, { marginBottom: dimensions.width * 0.06, justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={styles.initialText}>PLEASE EDIT YOUR INITIAL BUDGET</Text>
          </View>)
          : (
            <View style={[styles.container, { marginBottom: dimensions.width * 0.06 }]}>
              <View style={styles.progressCircleView}>
                <View style={styles.leftContainer}>
                  <AnimatedCircularProgress
                    size={dimensions.width / 2.1}
                    width={6}
                    fill={this.state.spentPercent}
                    tintColor={color.primary}
                    backgroundColor={color.primaryColor}
                    rotation={0}>
                    {
                      (spent) => (
                        <View style={styles.innerCircle}>
                          <Text style={styles.percentText}>
                            {Math.round(this.state.spentPercent)}%
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
                    <Text style={styles.amountText}>{`$` + this.state.totalBudget}</Text>
                    <View style={styles.line}></View>
                    <Text style={styles.totalBudgetText}>
                      ExpBudget
                </Text>
                    <Text style={styles.amountText}>{`$` + this.state.spent}</Text>
                  </View>
                </View>
              </View>
              {this.state.totalBudget < this.state.spent ? (<Text style={styles.warnText}>You crossed the budget limit</Text>) : null}
              <View style={{ marginHorizontal: 10 }}>
                <FlatList
                  scrollEnabled={false}
                  data={this.state.userBugetInfo}
                  extraData={this.state}
                  renderItem={this.renderItem.bind(this)}
                />
              </View>
            </View>
          )}
      </ScrollView>
    )
  }
}

export default connect(
  state => ({
    user: state.user,
    travel: state.travel,
    budget: state.budget
  }),
  { getBudgetByTravelId },
)(BudgetInfo)
