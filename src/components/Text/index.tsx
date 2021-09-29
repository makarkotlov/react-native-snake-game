import React, { FC } from 'react'
import { TextProps } from 'react-native'

import { TextBase, TextBaseProps } from './TextBase'

import { fontVariants, fontSizes } from './constants'

export type TextVariantProps = Omit<TextProps, 'style'> & {
  textAlign?: TextBaseProps['textAlign']
  color?: string
}

const createTextVariant =
  (config: TextBaseProps): FC<TextVariantProps> =>
  ({ children, ...props }) =>
    (
      <TextBase {...config} {...props}>
        {children}
      </TextBase>
    )

export const HugeTitle = createTextVariant({
  fontFamily: fontVariants.text,
  fontSize: fontSizes.headline1,
  lineHeight: 43,
  letterSpacing: 0.011,
})

export const HugeTitleDateMonth = createTextVariant({
  fontFamily: fontVariants.text,
  fontSize: fontSizes.headline1,
  lineHeight: 43,
  letterSpacing: 0.011,
})
