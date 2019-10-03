import { StyleSheet } from "react-native"
import { color, dimensions } from "../../theme"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        // alignItems: "center",
        backgroundColor: color.ImageBackgroundColor
    },
    header: { backgroundColor: color.primaryColor, height: 88 },
    mapView: { flex: 1 },
    headerTitle: {
        fontSize: 24,
        color: color.headerTitle,
        alignSelf: 'center',
        marginTop: 15,
        fontFamily: "OpenSans-Semibold"
    },
})

export default styles
