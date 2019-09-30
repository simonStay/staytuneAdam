import * as React from "react"
import { View, Image, ImageStyle } from "react-native"
import { IconProps } from "./icon.props"
import { icons } from "./icons"

const ROOT: ImageStyle = {
  resizeMode: "contain",
  height: 40,
  width: 40,
  marginTop: 40,
}

export function Icon(props: IconProps) {
  const { style: styleOverride, icon, containerStyle } = props
  const style: ImageStyle = { ...ROOT, ...styleOverride }

  return (
    <View style={containerStyle}>
      <Image style={style} source={icons[icon]} />
    </View>
  )
}
