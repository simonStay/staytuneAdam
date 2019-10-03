import { StyleSheet } from "react-native"
import { dimensions } from "../../theme/dimensions"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "white",
  },
  textField: {
    marginHorizontal: 20,
    height: 60,
    borderRadius: 10,
    borderColor: "#969696",
    borderWidth: 1,
    textAlign: "center",
    color: "black",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  wallpaper: { flex: 1 },
  header: { backgroundColor: "black", height: 88 },
  headerTitle: {
    fontSize: 26,
    color: "white",
    alignSelf: "center",
    marginTop: 15,
    fontWeight: "600",
  },
  scrollContainer: { flex: 1 },
  button: {
    backgroundColor: "orange",
    marginHorizontal: 20,
    height: 60,
    marginTop: 30,
  },
  buttonText: {
    fontSize: 21,
    textAlign: "center",
    fontWeight: "bold",
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
