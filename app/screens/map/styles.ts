import { StyleSheet } from "react-native"
import { color, dimensions } from "../../theme"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: color.ImageBackgroundColor,
  },
  header: { backgroundColor: color.primaryColor, height: 88 },
  mapView: { flex: 1 },
  headerTitle: {
    fontSize: 24,
    color: color.headerTitle,
    alignSelf: "center",
    marginTop: 15,
    fontFamily: "OpenSans-Semibold",
  },
  profilePicView: {
    width: dimensions.width / 2 - 60,
    height: dimensions.width / 2 - 60,
    borderRadius: (dimensions.width / 2 - 60) / 2,
    marginHorizontal: 20,
    marginVertical: 20,
    backgroundColor: color.text,
  },
  profilePic: {
    width: dimensions.width / 2 - 60,
    height: dimensions.width / 2 - 60,
    borderRadius: (dimensions.width / 2 - 60) / 2,
  },
})

export default styles
