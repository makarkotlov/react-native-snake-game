import React from 'react'
import { StoreProvider } from './mobx'
import { Navigator } from './Navigator'

const SnakeApp = () => (
  <StoreProvider>
    <Navigator />
  </StoreProvider>
)

export default SnakeApp
