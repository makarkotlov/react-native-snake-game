import React from 'react'
import { observer } from 'mobx-react'
import { GameEngine } from 'react-native-game-engine'
import { StackScreenProps } from '@react-navigation/stack'
import { StyleSheet, StatusBar, View, Alert } from 'react-native'
import { action, computed, makeObservable, observable } from 'mobx'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

import Head from './components/Head'
import Food from './components/Food'
import Tail from './components/Tail'
import Button from 'components/Button'
import FlexContainer from 'components/Layout/FlexContainer'

import GameLoop from './systems'
import SettingsStore from 'stores/SettingsStore'

import { AppStackRoutes } from 'navigator/stacks/AppStack/routes'
import { AppStackParamsList } from 'navigator/stacks/AppStack/types'

import { randomBetween } from 'utils'
import c, { Difficulties } from '@constants'

type Props = StackScreenProps<AppStackParamsList, AppStackRoutes.Settings>

class Game extends React.Component<Props> {
  static updateFrequency = {
    low: 15,
    medium: 5,
    high: 2,
  }

  static buildLevel = (gridSize: number, difficulty: Difficulties) => ({
    head: {
      position: [0, 0],
      xspeed: 1,
      yspeed: 0,
      nextMove: 10,
      updateFrequency: Game.updateFrequency[difficulty],
      size: 20,
      renderer: <Head />,
    },
    food: {
      position: [randomBetween(0, gridSize - 1), randomBetween(0, gridSize - 1)],
      size: 20,
      renderer: <Food />,
    },
    tail: {
      size: 20,
      elements: [],
      renderer: <Tail />,
    },
  })

  constructor(props: never) {
    super(props)

    makeObservable<Game, 'isRunning' | 'setIsRunning' | 'gridSize' | 'cellSize' | 'boardSize'>(this, {
      isRunning: observable,
      setIsRunning: action,
      gridSize: computed,
      cellSize: computed,
      boardSize: computed,
    })
  }

  private isRunning = true
  private setIsRunning = (value: boolean) => {
    this.isRunning = value
  }

  private get gridSize() {
    const { boardSize } = SettingsStore.settings

    return parseInt(boardSize.slice(0, 2), 10)
  }

  private get cellSize() {
    const { boardSize } = SettingsStore.settings

    return parseInt(boardSize.slice(3, 5), 10)
  }

  private get boardSize() {
    return this.gridSize * this.cellSize
  }

  private engineRef: GameEngine | null = null

  private reset = () => {
    const { difficulty } = SettingsStore.settings

    this.engineRef?.swap(Game.buildLevel(this.gridSize, difficulty))

    this.setIsRunning(true)
  }

  private onEvent = (e: { type: string }) => {
    const { navigation } = this.props

    if (e.type === 'game-over') {
      this.setIsRunning(false)

      Alert.alert('Game Over', 'Game Over', [
        { text: 'To menu', onPress: navigation.goBack },
        { text: 'New game', onPress: this.reset },
      ])
    }
  }

  render() {
    const { useSwipes, difficulty, theme, useTeleport } = SettingsStore.settings

    return (
      <FlexContainer style={{ backgroundColor: c.THEMES[theme].secondaryColor }}>
        <View style={[styles.wrapper, { justifyContent: useSwipes ? 'center' : 'space-between' }]}>
          <GameEngine
            ref={ref => {
              this.engineRef = ref
            }}
            style={{ width: this.boardSize, height: this.boardSize, backgroundColor: 'white', flex: undefined }}
            systems={[GameLoop(this.gridSize, useSwipes, useTeleport)]}
            entities={Game.buildLevel(this.gridSize, difficulty)}
            running={this.isRunning}
            onEvent={this.onEvent}
          >
            <StatusBar hidden />
          </GameEngine>

          {useSwipes ? null : (
            <View style={styles.controls}>
              <View style={styles.controlRow}>
                <Button onPress={() => this.engineRef?.dispatch({ type: 'move-up' })}>
                  <View style={[styles.control, { backgroundColor: c.THEMES[theme].primaryColor }]} />
                </Button>
              </View>
              <View style={styles.controlRow}>
                <Button onPress={() => this.engineRef?.dispatch({ type: 'move-left' })}>
                  <View style={[styles.control, { backgroundColor: c.THEMES[theme].primaryColor }]} />
                </Button>
                <View style={[styles.control, { backgroundColor: '' }]} />
                <Button onPress={() => this.engineRef?.dispatch({ type: 'move-right' })}>
                  <View style={[styles.control, { backgroundColor: c.THEMES[theme].primaryColor }]} />
                </Button>
              </View>
              <View style={styles.controlRow}>
                <Button onPress={() => this.engineRef?.dispatch({ type: 'move-down' })}>
                  <View style={[styles.control, { backgroundColor: c.THEMES[theme].primaryColor }]} />
                </Button>
              </View>
            </View>
          )}
        </View>
      </FlexContainer>
    )
  }
}

const styles = StyleSheet.create({
  controls: {
    width: 300,
    height: 300,
    flexDirection: 'column',
  },
  controlRow: {
    height: 100,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  control: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  wrapper: {
    height: hp('90%'),
    alignItems: 'center',
  },
})

export default observer(Game)
