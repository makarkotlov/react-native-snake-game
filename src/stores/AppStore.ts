import { makeAutoObservable } from 'mobx'

import SettingsStore from './SettingsStore'

class AppStore {
  constructor() {
    makeAutoObservable(this)
  }

  private _initialized = false

  get initialized() {
    return this._initialized
  }

  init = async () => {
    try {
      await SettingsStore.init()

      this.setInitialized(true)
    } catch (exception) {
      console.warn('AppStore error!', exception)

      return Promise.reject(exception)
    }
  }

  private setInitialized = (value: boolean) => {
    this._initialized = value
  }
}

export default new AppStore()
