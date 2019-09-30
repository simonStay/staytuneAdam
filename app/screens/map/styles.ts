import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        // alignItems: "center",
        backgroundColor: "white",
    },
    header: { backgroundColor: 'black', height: 88 },
    mapView: { flex: 1 },
    headerTitle: {
        fontSize: 26,
        color: 'white',
        alignSelf: 'center',
        marginTop: 15,
        fontWeight: '600'
    },
})

export default styles
