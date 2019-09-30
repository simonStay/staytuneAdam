import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#e9be5f",
  },
  contentStyle: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
  },
  subTextStyle: { color: "white", fontSize: 41, fontWeight: "600", textAlign: "center" },
  textStyle: {
    color: "white",
    fontSize: 25,
    textAlign: "center",
    marginHorizontal: 10,
  },
  forgotPasswordText: { color: "white", fontSize: 25, textAlign: "right", marginRight: 20 },
  inputStyle: {
    marginHorizontal: 20,
    height: 60,
    borderRadius: 10,
    borderColor: "#969696",
    borderWidth: 1,
    textAlign: "center",
    //paddingLeft: 10,
  },
  button: {
    marginHorizontal: 20,
    height: 60,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 26,
    fontWeight: "600",
  },
})

export default styles
