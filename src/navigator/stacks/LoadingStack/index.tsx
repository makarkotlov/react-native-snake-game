import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Loading from 'screens/Loading'

import { LoadingStackParamsList } from './types'

import { LoadingStackRoutes } from './routes'

const Stack = createStackNavigator<LoadingStackParamsList>()

const LoadingStack = (
  <Stack.Screen name={LoadingStackRoutes.Loading} component={Loading} options={{ headerShown: false }} />
)

export default LoadingStack
