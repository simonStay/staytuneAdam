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
import { TextField } from "../../components/text-field"
import { Icon } from "../../components/icon"
import { color, dimensions } from "../../theme"

import { connect } from "react-redux"
import { setBudgetInfo } from "../../redux/actions/travel"

interface Props {
    navigation: NavigationScreenProp<NavigationState>
}
interface UserInformation {
    selectedId: any
    selectedPreference: any
}

const array = [

    {
        id: 0, expanded: false, preferenceType: "Culinary", preferenceCategories: [{ id: 1, name: 'Mi' }, { id: 2, name: 'RealMe' }, { id: 3, name: 'Samsung' },
        { id: 4, name: 'Infinix' }, { id: 5, name: 'Oppo' }, { id: 6, name: 'Apple' }, { id: 7, name: 'Honor' }]
    },

    {
        id: 1, expanded: false, preferenceType: "Museums", preferenceCategories: [{ id: 8, name: 'Dell' }, { id: 9, name: 'MAC' }, { id: 10, name: 'HP' },
        { id: 11, name: 'ASUS' }]
    },

    {
        id: 2, expanded: false, preferenceType: "Entertainments", preferenceCategories: [{ id: 12, name: 'Pendrive' }, { id: 13, name: 'Bag' },
        { id: 14, name: 'Mouse' }, { id: 15, name: 'Keyboard' }]
    },

    {
        id: 3, expanded: false, preferenceType: "Adventure", preferenceCategories: [{ id: 16, name: 'Home Audio Speakers' },
        { id: 17, name: 'Home Theatres' }, { id: 18, name: 'Bluetooth Speakers' }, { id: 19, name: 'DTH Set Top Box' }]
    },

    {
        id: 4, expanded: false, preferenceType: "Shopping", preferenceCategories: [{ id: 20, name: 'Mi' },
        { id: 21, name: 'Thomson' }, { id: 22, name: 'LG' }, { id: 23, name: 'SONY' }]
    },
];


class SetInitialInterest extends Component<Props, UserInformation> {
    state: UserInformation
    constructor(props: Props) {
        super(props)
        this.state = {
            selectedId: '',
            selectedPreference: []
        }
    }

    componentDidMount() {
        // alert(dimensions.width)
    }

    onLeft() {
        this.props.navigation.goBack()
    }

    async onNext() {

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
                            return (<View style={styles.subListRow}>
                                <View style={styles.subListLeftRow}>
                                    <Text style={styles.subcategoryText}>{res.name}</Text>
                                </View>
                                <View style={styles.subListRightRow}>

                                </View>
                                {i === item.preferenceCategories.length - 1 ? (null) : <View style={styles.sublistLine} />}
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
                <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true}>
                    <FlatList
                        style={{ marginTop: dimensions.width * 0.09 }}
                        data={array}
                        extraData={this.state}
                        renderItem={this.renderItem.bind(this)}
                    />
                    {/* <Button style={styles.button} onPress={this.onNext.bind(this)}>
                        <View style={styles.buttonLeft}>
                            <Text style={styles.buttonText}>Next</Text>
                        </View>
                        <View style={styles.buttonRight}>
                            <Icon icon={"back"} style={styles.icon} />
                        </View>
                    </Button> */}
                </KeyboardAwareScrollView>
            </View>
        )
    }
}

export default connect(
    state => ({
        user: state.user,
    }),
    {},
)(SetInitialInterest)
