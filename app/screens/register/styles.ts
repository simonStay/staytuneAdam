import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        // justifyContent: "center",
        // alignItems: "center",
        backgroundColor: "white",
    },
    textField: {
        color: 'black',
        marginHorizontal: 20,
        // padding: 10,
        borderRadius: 6,
        textAlign: 'center'
    },
    wallpaper: { flex: 1 },
    scrollContainer: { flex: 1 },
    logo: {
        height: 100,
        width: 100,
        marginTop: 100,
        alignSelf: 'center',
        marginVertical: 10
    },
    welcomeText: {
        fontSize: 21,
        color: 'black',
        textAlign: 'center'
    },
    button: {
        backgroundColor: 'orange',
        marginHorizontal: 20,
        height: 60,
        marginTop: 30
    },
    buttonText: {
        fontSize: 21,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    bottomText: {
        fontSize: 19,
        color: 'black',
        textAlign: 'center'
    }
})

export default styles
