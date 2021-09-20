import React, { createContext, useContext } from 'react'
import { create } from 'mobx-persist'
import AsyncStorage from '@react-native-community/async-storage'
import c from '../constants'
import { SettingsStore, ISettingsStore } from './settingsStore'

const hydrate = create({ storage: AsyncStorage, jsonify: true })

class RootStore {
  settingsStore: ISettingsStore
  constructor() {
    this.settingsStore = new SettingsStore()
    Promise.all([hydrate('settings', this.settingsStore)]).then(() => this.finishLoading())
  }

  finishLoading() {
    setTimeout(() => {
      this.settingsStore.setLoaded(true)
    }, c.LOADING_DURATION + 300)
  }
}

const storesContext = createContext(null)

export const StoreProvider = ({ children }: { children: React.Component }) => {
  const store = new RootStore()
  return <storesContext.Provider value={store}>{children}</storesContext.Provider>
}

export const useStores = () => {
  const store = useContext(storesContext)
  if (!store) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error('useStores must be used within a StoreProvider.')
  }
  return store
}
