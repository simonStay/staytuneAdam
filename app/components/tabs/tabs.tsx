import * as React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { presets } from "./tabs.presets"
import { ViewProps } from "./tabs.props"
import { mergeAll, flatten } from "ramda"
import { color, dimensions } from "../../theme"
export function Tabs(props: ViewProps) {

  // grab the props
  const { preset = "default", txOptions, text, children, style: styleOverride, ...rest } = props
  const content = text || children
  const style = mergeAll(flatten([presets[preset] || presets.default, styleOverride]))

  let TabsArray = [];
  props.TabsList.map((res, i) => {
    TabsArray.push(
      <View style={{ marginHorizontal: 3 }}>
        <TouchableOpacity activeOpacity={0.9} style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => props.onPress(res)} >
          <Text style={{ color: color.text, fontSize: 16, fontFamily: 'OpenSans-Semibold' }}>
            {res.tab}
          </Text>
          {/* <View style={{ height: dimensions.height * 0.036, width: 2, backgroundColor: 'white' }} /> */}
        </ TouchableOpacity>
        {i === props.selectedTabId ?
          (<View style={{ height: 3, width: '100%', backgroundColor: 'white', marginTop: 3 }}></View>)
          : null}
      </View>)
  })


  return (
    <View style={style}
      {...rest}>
      {TabsArray}
    </View>
  )
}
