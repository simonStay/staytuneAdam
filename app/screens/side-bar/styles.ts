import { StyleSheet } from "react-native"
import { color, dimensions } from "../../theme/"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.primaryColor,
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
    avatar: {
        width: dimensions.width / 3 - 40,
        height: dimensions.width / 3 - 40,
        borderRadius: (dimensions.width / 3 - 40) / 2,
        marginHorizontal: 20,
        marginVertical: 20,
    },
    avatarImage: {
        width: dimensions.width / 3 - 40,
        height: dimensions.width / 3 - 40,
        borderRadius: (dimensions.width / 3 - 40) / 2,
    },
})

export default styles
