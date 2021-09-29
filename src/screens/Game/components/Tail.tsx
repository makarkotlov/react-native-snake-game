import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'

import c from '@constants'
import SettingsStore from 'stores/SettingsStore'

type Props = {
  elements?: number[][]
  size?: number
}

const Tail = ({ elements, size }: Props) => {
  if (!elements?.length || !size) {
    return null
  }

  const { boardSize, theme } = SettingsStore.settings

  const gridSize = parseInt(boardSize.slice(0, 2), 10)

  const tailList = elements.map((el, i) => (
    <View
      key={i}
      style={{
        width: size,
        height: size,
        position: 'absolute',
        left: el[0] * size,
        top: el[1] * size,
        backgroundColor: c.THEMES[theme].secondaryColor,
      }}
    />
  ))

  return <View style={{ width: gridSize * size, height: gridSize * size }}>{tailList}</View>
}

export default observer(Tail)
