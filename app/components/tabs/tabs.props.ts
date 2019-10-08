import { ViewStyle, ViewProps as ViewProperties } from "react-native"
import { tabsPresets } from "./tabs.presets"

export interface ViewProps extends ViewProperties {

  children?: React.ReactNode
  txOptions?: object
  text?: string
  style?: ViewStyle | ViewStyle[]
  preset?: tabsPresets
}
