import * as React from "react"
import { View, ViewStyle, Text, TextStyle } from "react-native"
import { spacing, fontsize, dimensions } from "../../theme"

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button"

const RADIO_CONTAINER: ViewStyle = {
  height: dimensions.height / 15.6,
  marginLeft: 20,
  marginRight: 20,
  marginTop: spacing[4],
  width: dimensions.width - 40,
  backgroundColor: "#fff",
  borderRadius: 10,
}
const RADIO_ALIGN: ViewStyle = { flex: 1, flexDirection: "row" }
const RADIO_TEXT: TextStyle = {
  fontSize: fontsize.text,
  marginLeft: 15,
  color: "#000",
  textAlign: "center",
  marginTop: dimensions.height <= 890 ? dimensions.height / 15.6 / 4 : dimensions.height / 15.6 / 3,
  fontFamily: "OpenSans-Semibold",
}

export interface RadioButtonProps {
  marialStatus: any
  selectedIndex: any
  selectedValue: any
  onPress: any
}

export const RadioButtonView: React.FunctionComponent<RadioButtonProps> = props => {
  return (
    <View style={RADIO_CONTAINER}>
      <View style={RADIO_ALIGN}>
        <Text style={RADIO_TEXT}>Marial Status:</Text>
        <RadioForm formHorizontal={true} animation={true} style={{ alignSelf: "center" }}>
          {props.marialStatus.map((obj, i) => {
            return (
              <RadioButton labelHorizontal={true} key={i}>
                {/*  You can set RadioButtonLabel before RadioButtonInput */}
                <RadioButtonInput
                  obj={obj}
                  index={i}
                  isSelected={props.selectedIndex === i}
                  onPress={props.onPress}
                  buttonInnerColor={"orange"}
                  buttonOuterColor={"#000"}
                  buttonSize={15}
                  buttonStyle={{}}
                  buttonWrapStyle={{ marginTop: dimensions.height / 15.6 / 6, marginLeft: 10 }}
                />
                <RadioButtonLabel
                  obj={obj}
                  index={i}
                  onPress={props.onPress}
                  labelStyle={{
                    fontWeight: "400",
                    fontFamily: "OpenSans-Semibold",
                    fontSize: 15,
                    marginTop: dimensions.height / 15.6 / 6,
                    marginLeft: 5,
                    color: "#000",
                  }}
                  labelWrapStyle={{}}
                />
              </RadioButton>
            )
          })}
        </RadioForm>
      </View>
    </View>
  )
}
