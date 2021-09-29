import React from 'react'
import { Image, ImageProps, ImageSourcePropType } from 'react-native'

export const iconsMap = {
  backIcon: require('./icons/back-icon.png') as ImageSourcePropType,
}

type Props = {
  name: keyof typeof iconsMap
  color?: string
} & Omit<ImageProps, 'source'>

const Icon = ({ name, color, ...rest }: Props) => <Image source={iconsMap[name]} {...rest} />

export default Icon
