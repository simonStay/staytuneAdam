import { StyleSheet } from "react-native"
import { color, dimensions } from "../../theme"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: color.ImageBackgroundColor
    },
    textField: {
        marginHorizontal: 20,
        height: dimensions.height / 15.6,
        borderRadius: 10,
        borderColor: "#969696",
        borderWidth: 0,
        textAlign: "center",
        color: color.textColor,
        fontSize: 19,
        fontFamily: "OpenSans",
    },
    wallpaper: { flex: 1 },
    header: { backgroundColor: color.primaryColor, height: 88 },
    headerTitle: {
        fontSize: 24,
        color: color.headerTitle,
        alignSelf: 'center',
        marginTop: 15,
        fontFamily: "OpenSans-Semibold"
    },
    scrollContainer: { flex: 1 },
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
    profilePicView: {
        width: dimensions.width / 2 - 60,
        height: dimensions.width / 2 - 60,
        borderRadius: (dimensions.width / 2 - 60) / 2,
        marginHorizontal: 20,
        marginVertical: 20,
        backgroundColor: color.text,
        alignSelf: 'center'
    },
    profilePic: {
        width: dimensions.width / 2 - 60,
        height: dimensions.width / 2 - 60,
        borderRadius: (dimensions.width / 2 - 60) / 2,
    },
})

export default styles
