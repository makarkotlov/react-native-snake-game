import { persist } from 'mobx-persist'
import { observable, action, makeAutoObservable } from 'mobx'

export interface ISettingsStore {
  settingsStore: {
    settings: {
      boardSize: string
      difficulty: string
      theme: string
      useSwipes: boolean
      useTeleport: boolean
    }
    setLoaded: Function
    updateBoardSize: Function
    updateDifficulty: Function
    updateTheme: Function
    updateUseSwipes: Function
    updateTeleport: Function
  }
}

const initialState = {
  boardSize: '15x20',
  difficulty: 'low',
  theme: 'yellow',
  useSwipes: false,
  useTeleport: false,
}

class SettingsStore {
  constructor() {
    makeAutoObservable(this)
  }

  @persist('object') settings = initialState

  loaded = false

  setLoaded(loaded: boolean) {
    this.loaded = loaded
  }

  updateBoardSize(boardSize: string) {
    this.settings.boardSize = boardSize
  }

  updateDifficulty(difficulty: string) {
    this.settings.difficulty = difficulty
  }

  updateTheme(theme: string) {
    this.settings.theme = theme
  }

  updateUseSwipes(useSwipes: boolean) {
    this.settings.useSwipes = useSwipes
  }

  updateTeleport(useTeleport: boolean) {
    this.settings.useTeleport = useTeleport
  }
}

export { SettingsStore }
