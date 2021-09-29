import React from 'react'
import { observer } from 'mobx-react'
import { StyleSheet, View } from 'react-native'

import c from '@constants'
import SettingsStore from 'stores/SettingsStore'

type Props = {
  position?: number[]
  size?: number
}

const Head = ({ position, size }: Props) => {
  if (!position?.length || !size) {
    return null
  }

  const { theme } = SettingsStore.settings

  const x = position[0]
  const y = position[1]

  return (
    <View
      style={[
        styles.head,
        {
          width: size,
          height: size,
          left: x * size,
          top: y * size,
          backgroundColor: c.THEMES[theme].secondaryColor,
        },
      ]}
    />
  )
}

const styles = StyleSheet.create({
  head: { position: 'absolute' },
})

export default observer(Head)
