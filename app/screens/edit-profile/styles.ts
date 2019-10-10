import { StyleSheet } from "react-native"
import { color, dimensions, fontsize } from "../../theme"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: color.transparent
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
    scrollContainer: { flex: 1 },
    button: {
        marginHorizontal: 20,
        height: dimensions.height / 15.6,
        borderRadius: 10,
        marginVertical: 20,
        color: color.buttonColor,
    },
    buttonText: {
        color: color.text,
        fontSize: fontsize.buttonText,
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
