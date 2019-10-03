import { StyleSheet } from "react-native"
import { color, dimensions } from "../../theme"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: color.ImageBackgroundColor,
  },
  contentStyle: {
    flex: 1,
  },
  textStyle: {
    color: color.text,
    fontSize: 24,
    textAlign: "center",
    marginHorizontal: 10,
    fontFamily: "OpenSans-Semibold"
  },
  forgotPasswordText: {
    color: color.text,
    fontSize: 20,
    textAlign: "right",
    marginRight: 20,
    fontFamily: "OpenSans-Semibold"
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
    // shadowOpacity: 0.75,
    // shadowRadius: 5,
    // shadowColor: '#969696',
    // shadowOffset: { height: 0, width: 0 },
  },
  wallpaper: { flex: 1 },
  logo: {
    height: 100,
    width: 100,
    marginTop: 100,
    alignSelf: "center",
    marginVertical: 10,
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
})

export default styles
