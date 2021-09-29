import React, { FC } from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'

type Props = {
  style?: ViewStyle
} & ViewStyle

const FlexContainer: FC<Props> = ({ children, style, ...props }) => (
  <View style={[styles.flex, style]} {...props}>
    {children}
  </View>
)

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
})

export default FlexContainer
