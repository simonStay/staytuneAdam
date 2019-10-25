import * as React from "react"
import { View, Text, TouchableOpacity, ViewStyle, TextStyle } from "react-native"
import { presets } from "./tabs.presets"
import { ViewProps } from "./tabs.props"
import { mergeAll, flatten } from "ramda"
import { color, dimensions } from "../../theme"

let tabSeparatorMarginLeft;
if (dimensions.width == 320) {
  tabSeparatorMarginLeft = 0
} else if (dimensions.width == 375) {
  tabSeparatorMarginLeft = 0
} else if (dimensions.width == 414) {
  tabSeparatorMarginLeft = 6.5
} else {
  tabSeparatorMarginLeft = 0
}

export function Tabs(props: ViewProps) {

  // grab the props
  const { preset = "default",
    txOptions,
    text,
    children,
    style: styleOverride,
    tabItemColor,
    separatorColor,
    selectedTabColor,
    selectedTabLineColor, ...rest } = props
  const content = text || children
  const style = mergeAll(flatten([presets[preset] || presets.default, styleOverride]))

  const TAB_ITEM_COLOR = props.tabItemColor || "white"
  const SEPARATOR_COLOR = props.separatorColor || "blue"
  const SELECTED_TAB_LINE = props.selectedTabLineColor || "blue"
  const TAB_COLOR = props.selectedTabColor || "white"

  let TabsArray = [];
  props.TabsList.map((res, i) => {
    TabsArray.push(
      <View style={{ flexDirection: 'row' }}>
        <View style={{ marginHorizontal: 3 }}>
          <TouchableOpacity activeOpacity={0.9} style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => props.onPress(res)} >
            <Text style={{ color: i === props.selectedTabId ? TAB_COLOR : TAB_ITEM_COLOR, fontSize: 16, fontFamily: 'OpenSans-Semibold' }}>
              {res.tab}
            </Text>

          </ TouchableOpacity>
          {i === props.selectedTabId ?
            (<View style={{ height: 1.6, width: '100%', backgroundColor: SELECTED_TAB_LINE, marginTop: 3 }}></View>)
            : null}
        </View>
        {i === props.TabsList.length - 1 ?
          null
          : (<View style={{ height: dimensions.height * 0.03, width: 1.6, backgroundColor: SEPARATOR_COLOR, marginLeft: tabSeparatorMarginLeft }} />)
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
