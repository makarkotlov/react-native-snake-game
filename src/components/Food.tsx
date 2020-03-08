import React from 'react'
import { StyleSheet, View } from 'react-native'

interface Props {
  position: Array<number>
  size: number
}

const Food: React.FC<Props> = ({ position, size }) => {
  const x = position[0]
  const y = position[1]

  return (
    <View
      style={[
        styles.food,
        {
          width: size,
          height: size,
          left: x * size,
          top: y * size,
          backgroundColor: 'red',
        },
      ]}
    />
  )
}

const styles = StyleSheet.create({
  food: { position: 'absolute', borderRadius: 10 },
})

export default Food
