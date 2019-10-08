import * as React from "react"
import { View, Text } from "react-native"
import { presets } from "./tabs.presets"
import { ViewProps } from "./tabs.props"
import { color, dimensions } from "../../theme"
import { mergeAll, flatten } from "ramda"
import LinearGradient from 'react-native-linear-gradient';
import { whileStatement } from '@babel/types';

const TabsList = [{ id: 0, tab: 'PROFILE INFO' }, { id: 1, tab: 'BUDGET INFO' }, { id: 2, tab: 'SAVED LOCATIONS' }];


export function Tabs(props: ViewProps) {
  // grab the props
  const { preset = "default", txOptions, text, children, style: styleOverride, ...rest } = props
  const content = text || children
  const style = mergeAll(flatten([presets[preset] || presets.default, styleOverride]))

  let TabsArray = [];
  TabsList.map((res, i) => {
    TabsArray.push(
      <View style={{ flexDirection: 'row', marginHorizontal: 3, alignItems: 'center' }}>
        <Text style={{ color: "white", fontSize: 16, fontFamily: 'OpenSans-Semibold' }}>
          {res.tab}
        </Text>
        {/* <View style={{ height: dimensions.height * 0.036, width: 2, backgroundColor: 'white' }} /> */}
      </View>)
  })


  return (
    <View style={style}
      {...rest}>
      {TabsArray}
    </View>
  )
}
