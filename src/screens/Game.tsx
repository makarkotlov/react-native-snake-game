import React, { useState, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import Button from 'apsl-react-native-button'
import { GameEngine } from 'react-native-game-engine'
import { StyleSheet, StatusBar, View, Alert } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import c from '../constants'
import { useStores } from '../mobx'
import { GameLoop } from '../systems'
import Head from '../components/Head'
import Food from '../components/Food'
import Tail from '../components/Tail'
import { ISettingsStore } from '../mobx/settingsStore'

const randomBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)

interface UpdateFrequency {
  [key: string]: number
}

const UPDATE_FREQUENCY: UpdateFrequency = {
  low: 10,
  medium: 5,
  high: 2,
}

const buildLevel = (gridSize: number, difficulty: string) => ({
  head: {
    position: [0, 0],
    xspeed: 1,
    yspeed: 0,
    nextMove: 10,
    updateFrequency: UPDATE_FREQUENCY[difficulty],
    size: 20,
    renderer: <Head />,
  },
  food: {
    position: [randomBetween(0, gridSize - 1), randomBetween(0, gridSize - 1)],
    size: 20,
    renderer: <Food />,
  },
  tail: { size: 20, elements: [], renderer: <Tail /> },
})

const Game = observer(({ navigation: { goBack } }) => {
  const {
    settingsStore: {
      settings: { boardSize: selectedBoardSize, useSwipes, difficulty, theme },
    },
  }: ISettingsStore = useStores()
  const gridSize = parseInt(selectedBoardSize.slice(0, 2), 10)
  const cellSize = parseInt(selectedBoardSize.slice(3, 5), 10)
  const boardSize = gridSize * cellSize
  const engineRef = useRef(null)
  const [isRunning, setIsRunning] = useState(true)

  const reset = () => {
    engineRef?.current?.swap(buildLevel(gridSize, difficulty))
    setIsRunning(true)
  }

  const onEvent = (e: { type: string }) => {
    if (e.type === 'game-over') {
      setIsRunning(false)
      Alert.alert('Game Over', 'Game Over', [
        { text: 'To menu', onPress: goBack },
        { text: 'New game', onPress: reset },
      ])
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: c.THEMES[theme].secondaryColor }]}>
      <View style={[styles.wrapper, { justifyContent: useSwipes ? 'center' : 'space-between' }]}>
        <GameEngine
          ref={engineRef}
          style={{ width: boardSize, height: boardSize, backgroundColor: 'white', flex: undefined }}
          systems={[GameLoop(gridSize, useSwipes)]}
          entities={buildLevel(gridSize, difficulty)}
          running={isRunning}
          onEvent={onEvent}
        >
          <StatusBar hidden />
        </GameEngine>

        {useSwipes ? null : (
          <View style={styles.controls}>
            <View style={styles.controlRow}>
              <Button onPress={() => engineRef?.current?.dispatch({ type: 'move-up' })}>
                <View style={[styles.control, { backgroundColor: c.THEMES[theme].primaryColor }]} />
              </Button>
            </View>
            <View style={styles.controlRow}>
              <Button onPress={() => engineRef?.current?.dispatch({ type: 'move-left' })}>
                <View style={[styles.control, { backgroundColor: c.THEMES[theme].primaryColor }]} />
              </Button>
              <View style={[styles.control, { backgroundColor: '' }]} />
              <Button onPress={() => engineRef?.current?.dispatch({ type: 'move-right' })}>
                <View style={[styles.control, { backgroundColor: c.THEMES[theme].primaryColor }]} />
              </Button>
            </View>
            <View style={styles.controlRow}>
              <Button onPress={() => engineRef?.current?.dispatch({ type: 'move-down' })}>
                <View style={[styles.control, { backgroundColor: c.THEMES[theme].primaryColor }]} />
              </Button>
            </View>
          </View>
        )}
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  controls: { width: 300, height: 300, flexDirection: 'column' },
  controlRow: { height: 100, width: 300, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' },
  control: { width: 90, height: 90, borderRadius: 10 },
  wrapper: { height: hp('90%'), alignItems: 'center' },
})

export { Game }
