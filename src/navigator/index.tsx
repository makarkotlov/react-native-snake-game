import React from 'react'
import { observer } from 'mobx-react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import AppStore from 'stores/AppStore'
import SettingsStore from 'stores/SettingsStore'

import AppStack from './stacks/AppStack'
import LoadingStack from './stacks/LoadingStack'

import c from '@constants'

const Stack = createStackNavigator()

class Navigator extends React.Component {
  componentDidMount() {
    AppStore.init()
  }

  render() {
    const { initialized } = AppStore
    const { theme } = SettingsStore.settings

    return (
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: c.THEMES[theme].secondaryColor,
          },
        }}
      >
        <Stack.Navigator>{!initialized ? LoadingStack : AppStack}</Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default observer(Navigator)
