import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Game from 'screens/Game'
import Home from 'screens/Home'
import Settings from 'screens/Settings'

import { AppStackParamsList } from './types'

import { AppStackRoutes } from './routes'

const Stack = createStackNavigator<AppStackParamsList>()

const AppStack = (
  <Stack.Group screenOptions={{ headerShown: false }}>
    <Stack.Screen name={AppStackRoutes.Home} component={Home} />
    <Stack.Screen name={AppStackRoutes.Settings} component={Settings} />
    <Stack.Screen name={AppStackRoutes.Game} component={Game} />
  </Stack.Group>
)

export default AppStack
