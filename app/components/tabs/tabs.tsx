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
      <View style={{ flexDirection: 'row' }}>
        <View style={{ marginHorizontal: 3 }}>
          <TouchableOpacity activeOpacity={0.9} style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => props.onPress(res)} >
            <Text style={{ color: color.text, fontSize: 16, fontFamily: 'OpenSans-Semibold' }}>
              {res.tab}
            </Text>

          </ TouchableOpacity>
          {i === props.selectedTabId ?
            (<View style={{ height: 1.6, width: '100%', backgroundColor: "blue", marginTop: 3 }}></View>)
            : null}
        </View>
        {i === props.TabsList.length - 1 ?
          null
          : (<View style={{ height: dimensions.height * 0.03, width: 1.6, backgroundColor: "blue", marginLeft: 6.5 }} />)
        }

      </View>)
  })


  return (
    <View style={style}
      {...rest}>
      {TabsArray}

    </View>
  )
}
