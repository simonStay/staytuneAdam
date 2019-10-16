import { StyleSheet } from "react-native"
import { color, dimensions, fontsize, spacing } from "../../theme"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: color.ImageBackgroundColor
    },
    wallpaper: { flex: 1 },
    header: { backgroundColor: color.primaryColor },
    headerTitle: {
        color: color.headerTitle,
        fontFamily: "OpenSans-Semibold",
        marginRight: spacing[3]
    },
    textStyle: {
        color: color.text,
        fontSize: fontsize.screenTitle,
        textAlign: "center",
        marginHorizontal: spacing[1],
        marginBottom: spacing[1],
        marginTop: spacing[6],
        fontFamily: "OpenSans-Semibold",
        textShadowColor: color.textColor,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 0,
    },
    inputStyle: {
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
    initialText: {
        color: color.text,
        fontSize: 31,
        fontWeight: "600",
        alignSelf: 'center',
        fontFamily: "OpenSans-Semibold",
        textShadowColor: color.textColor,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 0
    },
    button: {
        marginHorizontal: 20,
        height: dimensions.height / 15.6,
        borderRadius: 10,
        marginBottom: 30,
        color: color.buttonColor,
        flexDirection: 'row',
        marginTop: dimensions.height / 6.5
    },
    buttonText: {
        color: color.text,
        fontSize: fontsize.buttonText,
        alignSelf: 'flex-end',
        fontWeight: "600",
        fontFamily: "OpenSans-Semibold",
    },
    buttonLeft: { flex: 0.6, justifyContent: 'flex-end' },
    buttonRight: { flex: 0.4, justifyContent: 'flex-start' },
    icon: {
        width: dimensions.width * 0.076,
        marginRight: 3,
        height: dimensions.width * 0.076,
        alignSelf: 'flex-end',
        transform: [{ rotateY: '180deg' }],
    },
    iconStyle: {
        width: 30,
        height: 30,
        justifyContent: 'flex-end',
        alignItems: 'center',
        tintColor: '#fff'
    },
    scrollContainer: { flex: 1, justifyContent: 'center' },
    mainListView: {
        marginHorizontal: 10,
        backgroundColor: color.primaryColor,
        marginTop: dimensions.width * 0.063,
        height: dimensions.width * 0.149,
        justifyContent: 'center',
        paddingHorizontal: 10,
        // shadowColor: 'blue',
        // shadowOffset: { width: 1, height: 1 },
        // shadowOpacity: 0.8,
        // shadowRadius: 2,
        // elevation: 6
    },
    subListView: {
        marginHorizontal: 10,
        backgroundColor: color.text,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    subListRow: {
        flexDirection: 'column',
        paddingHorizontal: 0,
        height: dimensions.width * 0.149,
    },
    preferenceRow: {
        flexDirection: 'row',
    },
    preferenceLeftRow: {
        flex: 0.9
    },
    preferenceRightRow: {
        flex: 0.1,
        alignItems: 'flex-end'
    },
    preferenceText: {
        color: color.text,
        fontSize: fontsize.menuText,
        fontWeight: "600",
        alignSelf: 'flex-start',
        fontFamily: "OpenSans-Semibold",
    },
    toggleBackIcon: {
        width: dimensions.width * 0.06,
        height: dimensions.width * 0.06,
        justifyContent: 'flex-end',
        tintColor: '#fff',
        transform: [{ rotateY: '180deg' }],
    },
    subListLeftRow: {
        flex: 0.9,
        justifyContent: 'center'
    },
    subListRightRow: {
        flex: 0.1,
        alignItems: 'flex-end'
    },
    sublistLine: { width: '100%', height: 1, backgroundColor: color.ImageBackgroundColor, marginHorizontal: 0 },
    subcategoryText: {
        color: color.textColor,
        fontSize: fontsize.menuText,
        alignSelf: 'flex-start',
        fontFamily: "OpenSans-Semibold",
    }
})

export default styles
