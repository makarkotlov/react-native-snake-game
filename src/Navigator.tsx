import React from 'react'
import { observer } from 'mobx-react'
import { enableScreens } from 'react-native-screens'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import c from './constants'
import { useStores } from './mobx'
import { Game } from './screens/Game'
import { Home } from './screens/Home'
import { Loading } from './screens/Loading'
import { Settings } from './screens/Settings'

enableScreens()

const Stack = createStackNavigator()

const Navigator = observer(() => {
  const {
    settingsStore: {
      loaded,
      settings: { theme },
    },
  } = useStores()
  if (!loaded) {
    return <Loading />
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: c.THEMES[theme].secondaryColor,
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitleStyle: { fontFamily: c.FONTS.JOYSTIX },
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen name="Game" component={Game} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
})

export { Navigator }
