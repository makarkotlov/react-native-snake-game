import React, { FC } from 'react'
import {
  TouchableOpacityProps,
  TouchableNativeFeedbackProps,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native'

type Props = TouchableOpacityProps | TouchableNativeFeedbackProps

const Button: FC<Props> = ({ children, ...props }) =>
  Platform.OS === 'ios' ? (
    <TouchableOpacity activeOpacity={0.5} {...props}>
      {children}
    </TouchableOpacity>
  ) : (
    <TouchableNativeFeedback {...props}>{children}</TouchableNativeFeedback>
  )

export default Button
