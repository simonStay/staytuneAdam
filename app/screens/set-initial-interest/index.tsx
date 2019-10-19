import React, { Component } from "react"
import { View, FlatList, TouchableOpacity, Image } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import styles from "./styles"
import { Wallpaper } from "../../components/wallpaper"
import { Header } from "../../components/header"
import { GoldBarView } from "../../components/goldBar"
import { Text } from "../../components/text"
import { Button } from "../../components/button"
import { Switch } from "../../components/switch"
import { Toggle } from "react-powerplug"
import { Icon } from "../../components/icon"

import { connect } from "react-redux"
import AnimatedLoader from "react-native-animated-loader"

interface Props {
    navigation: NavigationScreenProp<NavigationState>
    getValue: any
    travel: any
}
interface UserInformation {
    selectedId: any
    selectedPreference: any
    visible: boolean
    userInitialInterests: any
    listOpen: any
}

const array = [
    {
        id: 0,
        preferenceType: "Culinary",
        preferenceCategories:
            [{ id: 0, name: 'Food', selected: false },
            { id: 1, name: 'beer', selected: false },
            { id: 2, name: ' bakery café', selected: false },
            { id: 3, name: 'bar', selected: false }]
    },
    {
        id: 1,
        preferenceType: "Museums",
        preferenceCategories:
            [{ id: 0, name: 'Art', selected: false },
            { id: 1, name: 'History', selected: false },
            { id: 2, name: 'customs', selected: false }]
    },
    {
        id: 2,
        preferenceType: "Entertainments",
        preferenceCategories:
            [{ id: 0, name: 'shows', selected: false },
            { id: 1, name: 'concerts', selected: false },
            { id: 2, name: 'amusement parks', selected: false },
            { id: 3, name: 'night club', selected: false },
            { id: 4, name: 'bookstores', selected: false }]
    },
    {
        id: 3,
        preferenceType: "Adventure",
        preferenceCategories: [{ id: 0, name: 'hiking', selected: false }]
    },
    {
        id: 4,
        preferenceType: "Shopping",
        preferenceCategories:
            [{ id: 0, name: 'boutique', selected: false },
            { id: 1, name: 'high-end couture', selected: false }]
    },
];


class SetInitialInterest extends Component<Props, UserInformation> {
    state: UserInformation
    constructor(props: Props) {
        super(props)
        this.state = {
            selectedId: '',
            selectedPreference: [],
            visible: this.props.travel.loader,
            userInitialInterests: array,
            listOpen: false
        }
    }

    async componentDidMount() {
        // alert(dimensions.width)
        //this.setState({ userInitialInterests: [] })
    }

    onLeft() {
        this.props.navigation.goBack()
    }

    async onNext() {
        console.log("userInitialInterests" + JSON.stringify(this.state.userInitialInterests))
    }

    async onToggleList(item) {
        let count = 0
        if (this.state.selectedPreference.length == 0) {
            this.state.selectedPreference.push({ id: item.id })
        } else {
            this.state.selectedPreference.map((res, i) => {
                if (res.id === item.id) {
                    this.state.selectedPreference.splice(i, 1)
                    count++
                }
            })
            if (count === 0) {
                this.state.selectedPreference.push({ id: item.id })
            }
        }
        await this.setState({ selectedPreference: this.state.selectedPreference })
        console.log('selectedPreference_123:', this.state.selectedPreference)
    }

    toggleSwitch(item, res, toggle, on, showSublist) {
        let selectedPreferences = []
        console.log('showSublist', showSublist)
        console.log('toggleSwitch:' + JSON.stringify(item.preferenceType) + ' ' + 'res:', JSON.stringify(res) + ' ' + 'on:' + on)
        // this.state.userInitialInterests.map((preference, i) => {})

        if (selectedPreferences.length == 0) {
            selectedPreferences.push({ preferenceType: item.preferenceType.preferenceCategories })
        }

        // console.log("userInitialInterests", JSON.stringify(selectedPreferences))
    }

    onToggleChange(on, res) {
        console.log('showSublist_1111123', JSON.stringify(res))
    }

    renderItem({ item }) {
        var count = 0;
        var showSublist;
        var ImageView;
        this.state.selectedPreference.map((res, i) => {
            if (res.id == item.id) {
                showSublist = true;
                count = count + 1;
            }
            if (count === 0) {
                showSublist = false;
            }
        });

        if (showSublist == true) {
            ImageView = (<Icon icon={"verticaldownarrow"} style={styles.toggleBackIcon} />)
        } else {
            ImageView = (<Icon icon={"back"} style={styles.toggleBackIcon} />)
        }

        return (
            <View>
                <View style={styles.mainListView}>
                    <TouchableOpacity style={styles.preferenceRow} onPress={this.onToggleList.bind(this, item)}>
                        <View style={styles.preferenceLeftRow}>
                            <Text style={styles.preferenceText}>{item.preferenceType}</Text>
                        </View>
                        <View style={styles.preferenceRightRow}>
                            {ImageView}
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.subListView}>
                    {showSublist == true ? (
                        item.preferenceCategories.map((res, i) => {
                            return (
                                <View style={[styles.subListRow, { borderBottomWidth: i === item.preferenceCategories.length - 1 ? 0 : 1 }]}>
                                    <View style={styles.subListLeftRow}>
                                        <Text style={styles.subcategoryText}>{res.name}</Text>
                                    </View>
                                    <View style={styles.subListRightRow}>

                                        <Toggle initial={false} onChange={this.onToggleChange(res)}>
                                            {({ on, toggle, set }) =>
                                                <Switch
                                                    trackOnStyle={styles.trackOn}
                                                    trackOffStyle={styles.trackOff}
                                                    thumbOnStyle={styles.thumbOn}
                                                    thumbOffStyle={styles.thumbOff}
                                                    value={on}
                                                    onToggle={toggle}
                                                    getValue={this.toggleSwitch(item, res, toggle, on, showSublist)}
                                                />
                                            }
                                        </Toggle>

                                    </View>
                                </View>)
                        })
                    ) : null}
                </View>
            </View>
        )
    }


    render() {
        return (
            <View style={styles.container}>
                <Wallpaper style={styles.wallpaper} />

                <Header
                    style={styles.header}
                    headerText={"SET INITIAL INTEREST"}
                    titleStyle={styles.headerTitle}
                    leftIcon={"back"}
                    onLeftPress={this.onLeft.bind(this)}
                />
                <GoldBarView />

                <FlatList
                    style={{ flex: 1, marginTop: 10 }}
                    data={array}
                    extraData={this.state}
                    renderItem={this.renderItem.bind(this)}
                />

                <View style={{ marginTop: 15 }}>
                    <Button style={styles.button} onPress={this.onNext.bind(this)}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </Button>
                </View>

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
    {},
)(SetInitialInterest)
