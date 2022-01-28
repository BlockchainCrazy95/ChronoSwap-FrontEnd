import { light as baseLight, dark as darkLight } from '@pancakeswap/uikit'
import type { PancakeTheme } from '@pancakeswap/uikit'
import cloneDeep from 'lodash/cloneDeep'

const darkOverrided: PancakeTheme = cloneDeep(darkLight)
const lightOverrided: PancakeTheme = cloneDeep(baseLight)

lightOverrided.colors.tertiary = 'rgba(239, 244, 245, 1)'

export default {
  dark: darkOverrided,
  light: lightOverrided,
}
