import { StyleSheet } from "react-native"
import { color, dimensions } from "../../theme/"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.primaryColor,
    },
    button: {
        marginHorizontal: 20,
        height: dimensions.height / 15.6,
        borderRadius: 10,
        marginTop: 20,
        color: color.buttonColor,
    },
    buttonText: {
        color: color.text,
        fontSize: 26,
        fontWeight: "600",
        fontFamily: "OpenSans-Semibold"
    },
    profilePicOutterView: {
        flex: 0.26,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profilePicView: {
        width: dimensions.width / 2 - 60,
        height: dimensions.width / 2 - 60,
        borderRadius: (dimensions.width / 2 - 60) / 2,
        marginHorizontal: 20,
        marginVertical: 20,
        backgroundColor: color.text
    },
    profilePic: {
        width: dimensions.width / 2 - 60,
        height: dimensions.width / 2 - 60,
        borderRadius: (dimensions.width / 2 - 60) / 2,
    },
    buttonView: {
        flex: 0.12,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'orange'
    },
    editProfileButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: dimensions.width / 2 - 30,
        height: dimensions.width / 2 - 160,
    },
    editprofileText: {
        color: color.primaryColor,
        fontSize: 21,
        fontFamily: "OpenSans-Semibold"
    },
    menuItemsView: {
        flex: 0.73,
        justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: 'blue'
    },
    row: {
        marginHorizontal: 15,
        marginVertical: 10,
        flexDirection: 'row'
    },
    line: {
        width: '90%',
        height: 1,
        backgroundColor: color.line,
        marginLeft: 15,
        marginRight: 15,
    },
    itemIcon: {
        height: 31,
        width: 31,
        marginTop: 0,
        marginLeft: 3,
        marginRight: 10
    },
    itemText: {
        color: color.text,
        fontSize: 19,
        fontFamily: "OpenSans-Semibold"
    }
})

export default styles
