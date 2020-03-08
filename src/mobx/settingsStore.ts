import { persist } from 'mobx-persist'
import { observable, action } from 'mobx'

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
  @persist('object') @observable settings = initialState

  @observable loaded = false

  @action.bound
  setLoaded(loaded: boolean) {
    this.loaded = loaded
  }

  @action.bound
  updateBoardSize(boardSize: string) {
    this.settings.boardSize = boardSize
  }

  @action.bound
  updateDifficulty(difficulty: string) {
    this.settings.difficulty = difficulty
  }

  @action.bound
  updateTheme(theme: string) {
    this.settings.theme = theme
  }

  @action.bound
  updateUseSwipes(useSwipes: boolean) {
    this.settings.useSwipes = useSwipes
  }

  @action.bound
  updateTeleport(useTeleport: boolean) {
    this.settings.useTeleport = useTeleport
  }
}

export { SettingsStore }
