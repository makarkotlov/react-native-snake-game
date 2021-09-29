import React from 'react'
import { observer } from 'mobx-react'
import RNExitApp from 'react-native-exit-app'
import { StackScreenProps } from '@react-navigation/stack'
import { StyleSheet, StatusBar, View, Text } from 'react-native'

import Button from 'components/Button'
import FlexContainer from 'components/Layout/FlexContainer'

import SettingsStore from 'stores/SettingsStore'

import { AppStackRoutes } from 'navigator/stacks/AppStack/routes'
import { AppStackParamsList } from 'navigator/stacks/AppStack/types'

import c from '@constants'

type Props = StackScreenProps<AppStackParamsList, AppStackRoutes.Home>

class Home extends React.Component<Props> {
  private startNewGame = () => {
    const { navigation } = this.props

    navigation.navigate(AppStackRoutes.Game)
  }
  private goToSettings = () => {
    const { navigation } = this.props

    navigation.navigate(AppStackRoutes.Settings)
  }

  render() {
    const { theme } = SettingsStore.settings

    return (
      <FlexContainer style={{ backgroundColor: c.THEMES[theme].secondaryColor }}>
        <StatusBar translucent={false} backgroundColor={c.THEMES[theme].secondaryColor} barStyle="light-content" />
        <Text style={[styles.title, { color: c.THEMES[theme].lightColor }]}>Snake</Text>
        <View style={styles.menuWrapper}>
          <Button onPress={this.startNewGame}>
            <View style={[styles.btnContainer, { backgroundColor: c.THEMES[theme].primaryColor }]}>
              <Text style={[styles.btnText, { color: c.THEMES[theme].secondaryColor }]}>New Game</Text>
            </View>
          </Button>
          <Button onPress={this.goToSettings}>
            <View style={[styles.btnContainer, { backgroundColor: c.THEMES[theme].primaryColor }]}>
              <Text style={[styles.btnText, { color: c.THEMES[theme].secondaryColor }]}>Settings</Text>
            </View>
          </Button>
          <Button onPress={RNExitApp.exitApp}>
            <View style={[styles.btnContainer, { backgroundColor: c.THEMES[theme].primaryColor }]}>
              <Text style={[styles.btnText, { color: c.THEMES[theme].secondaryColor }]}>Exit</Text>
            </View>
          </Button>
        </View>
      </FlexContainer>
    )
  }
}

const styles = StyleSheet.create({
  btnContainer: {
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
  },
  btnText: {
    fontSize: 20,
    margin: 9,
    fontFamily: c.FONTS.JOYSTIX,
  },
  menuWrapper: {
    width: '50%',
    height: '24%',
    justifyContent: 'space-between',
  },
  title: {
    color: 'white',
    fontSize: 50,
    fontFamily: c.FONTS.JOYSTIX,
  },
})

export default observer(Home)
