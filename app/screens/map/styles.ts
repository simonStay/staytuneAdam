import { StyleSheet } from "react-native"
import { color, dimensions, fontsize, spacing } from "../../theme"

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
  // button: {
  //   marginHorizontal: 20,
  //   height: dimensions.height / 15.6,
  //   borderRadius: 10,
  //   color: color.buttonColor,
  //   flexDirection: "row",
  //   marginTop: spacing[6],
  //   zIndex: 999,
  //   marginBottom: spacing[6],
  // },
  // buttonText: {
  //   color: color.text,
  //   fontSize: fontsize.buttonText,
  //   alignSelf: "flex-end",
  //   fontWeight: "600",
  //   fontFamily: "OpenSans-Semibold",
  // },
  // buttonLeft: { flex: 0.6, justifyContent: "flex-end" },
  // buttonRight: { flex: 0.4, justifyContent: "flex-start" },
  // icon: {
  //   width: dimensions.width * 0.076,
  //   marginRight: 3,
  //   height: dimensions.width * 0.076,
  //   alignSelf: "flex-end",
  //   transform: [{ rotateY: "180deg" }],
  // },
  // startPlan: {
  //   height: 60,
  //   width: dimensions.width / 2,
  //   marginTop: dimensions.height - 200,
  //   alignSelf: "center",
  //   backgroundColor: color.buttonColor,
  // },
  // Text: {
  //   color: color.text,
  //   fontSize: fontsize.buttonText,
  //   alignSelf: "center",
  //   justifyContent: "center",
  //   paddingTop: 5,
  //   fontWeight: "600",
  //   fontFamily: "OpenSans-Semibold",
  // },
  startPlan: {
    width: dimensions.width - 40,
    marginLeft: 20,
    position: "absolute",
    marginTop: dimensions.height - 220,
  },
  image: {
    width: dimensions.width - 40,
    marginLeft: 20,
    position: "absolute",
    marginTop: dimensions.height - 220,
    resizeMode: "contain",
  },
  map: {
    flex: 1,
  },
})

export default styles
