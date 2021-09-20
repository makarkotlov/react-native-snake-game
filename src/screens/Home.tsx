import React from 'react'
import { observer } from 'mobx-react-lite'
import RNExitApp from 'react-native-exit-app'
import Button from 'apsl-react-native-button'
import { StyleSheet, StatusBar, SafeAreaView, View, Text } from 'react-native'
import c from '../constants'
import { useStores } from '../mobx'
import { ISettingsStore } from '../mobx/settingsStore'

interface Props {
  navigation: {
    navigate: Function
  }
}

const Home: React.FC<Props> = observer(({ navigation: { navigate } }) => {
  const {
    settingsStore: {
      settings: { theme },
    },
  }: ISettingsStore = useStores()
  const startNewGame = () => navigate('Game')
  const goToSettings = () => navigate('Settings')

  return (
    <View style={[styles.container, { backgroundColor: c.THEMES[theme].secondaryColor }]}>
      <StatusBar translucent={false} backgroundColor={c.THEMES[theme].secondaryColor} barStyle="light-content" />
      <Text style={styles.title}>Snake</Text>
      <View style={styles.menuWrapper}>
        <Button onPress={startNewGame}>
          <View style={[styles.btnContainer, { backgroundColor: c.THEMES[theme].primaryColor }]}>
            <Text style={[styles.btnText, { color: c.THEMES[theme].secondaryColor }]}>New Game</Text>
          </View>
        </Button>
        <Button onPress={goToSettings}>
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
    </View>
  )
})

const styles = StyleSheet.create({
  btnContainer: { width: '100%', alignItems: 'center', borderRadius: 5 },
  btnText: { fontSize: 20, margin: 9, fontFamily: c.FONTS.JOYSTIX },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  menuWrapper: { width: '50%', height: '24%', justifyContent: 'space-between' },
  title: { color: 'white', fontSize: 50, fontFamily: c.FONTS.JOYSTIX },
})

export { Home }
