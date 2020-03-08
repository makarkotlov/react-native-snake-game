import React from 'react'
import { observer } from 'mobx-react'
import { StyleSheet, View } from 'react-native'
import c from '../constants'
import { useStores } from '../mobx'
import { ISettingsStore } from '../mobx/settingsStore'

interface Props {
  position: Array<number>
  size: number
}

const Head: React.FC<Props> = observer(({ position, size }) => {
  const {
    settingsStore: {
      settings: { theme },
    },
  }: ISettingsStore = useStores()
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
})

const styles = StyleSheet.create({
  head: { position: 'absolute' },
})

export default Head
