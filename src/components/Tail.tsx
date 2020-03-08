import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react-lite'
import c from '../constants'
import { useStores } from '../mobx'
import { ISettingsStore } from '../mobx/settingsStore'

interface Props {
  elements: Array<Array<number>>
  size: number
}

const Tail: React.FC<Props> = observer(({ elements, size }) => {
  const {
    settingsStore: {
      settings: { boardSize, theme },
    },
  }: ISettingsStore = useStores()
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
})

export default Tail
