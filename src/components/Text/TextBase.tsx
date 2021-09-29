import React, { FC } from 'react'
import { Text, TextProps, TextStyle } from 'react-native'

export type TextBaseProps = TextProps & {
  fontFamily: string
  fontSize: number
  lineHeight?: number
  letterSpacing?: number
  textAlign?: TextStyle['textAlign']
  paddingBottom?: number
  color?: string
}

export const TextBase: FC<TextBaseProps> = ({
  children,
  fontFamily,
  fontSize,
  lineHeight,
  letterSpacing,
  textAlign,
  paddingBottom,
  color = 'black',
  ...props
}) => (
  <Text
    style={{
      fontFamily,
      fontSize,
      color,
      lineHeight,
      letterSpacing,
      textAlign,
      paddingBottom,
    }}
    {...props}
  >
    {children}
  </Text>
)
