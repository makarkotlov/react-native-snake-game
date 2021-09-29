import React from 'react'
import { observer } from 'mobx-react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import AppStore from 'stores/AppStore'

import AppStack from './stacks/AppStack'
import LoadingStack from './stacks/LoadingStack'

const Stack = createStackNavigator()

class Navigator extends React.Component {
  componentDidMount() {
    AppStore.init()
  }

  render() {
    const { initialized } = AppStore

    return (
      <NavigationContainer>
        <Stack.Navigator>{!initialized ? LoadingStack : AppStack}</Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default observer(Navigator)
