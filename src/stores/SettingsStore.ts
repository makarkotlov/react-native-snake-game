import { makeAutoObservable } from 'mobx'
import { create, persist } from 'mobx-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

import c, { BoardSizes, ColorThemes, Difficulties } from '@constants'

type Settings = {
  boardSize: BoardSizes
  difficulty: Difficulties
  theme: ColorThemes
  useSwipes: boolean
  useTeleport: boolean
}

class SettingsStore {
  static defaultSettings = {
    boardSize: BoardSizes['15x20'],
    difficulty: Difficulties.low,
    theme: ColorThemes.yellow,
    useSwipes: false,
    useTeleport: false,
  }

  constructor() {
    makeAutoObservable(this)
  }

  // FIXME: get rid of decorator
  @persist('object') private _settings: Settings = SettingsStore.defaultSettings

  get settings() {
    return this._settings
  }

  private _loading = false

  get loading() {
    return this._loading
  }

  init = async () => {
    try {
      this.setLoading(true)

      await this.hydrate('settings', this)
      // Imitation of long loading
      // to show fancy loading screen
      await new Promise<void>(res =>
        setTimeout(() => {
          res()
        }, c.LOADING_DURATION)
      )

      this.setLoading(false)
    } catch (exception) {
      console.warn('SettingsStore error!', exception)

      this.setLoading(false)

      return Promise.reject(exception)
    }
  }

  private hydrate = create({ storage: AsyncStorage, jsonify: true })

  private setLoading = (value: boolean) => {
    this._loading = value
  }

  updateBoardSize = (boardSize: BoardSizes) => {
    this._settings.boardSize = boardSize
  }

  updateDifficulty = (difficulty: Difficulties) => {
    this._settings.difficulty = difficulty
  }

  updateTheme = (theme: ColorThemes) => {
    this._settings.theme = theme
  }

  updateUseSwipes = (useSwipes: boolean) => {
    this._settings.useSwipes = useSwipes
  }

  updateTeleport = (useTeleport: boolean) => {
    this._settings.useTeleport = useTeleport
  }
}

export default new SettingsStore()
