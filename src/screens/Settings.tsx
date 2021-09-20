import React from 'react'
import { observer } from 'mobx-react-lite'
import Button from 'apsl-react-native-button'
import BackgroundColor from 'react-native-background-color'
import { StyleSheet, StatusBar, View, Text, Platform, ScrollView } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import c from '../constants'
import { useStores } from '../mobx'
import { ISettingsStore } from '../mobx/settingsStore'

const Settings = observer(() => {
  const {
    settingsStore: {
      settings: {
        boardSize: selectedBoardSize,
        difficulty: selectedDifficulty,
        theme: selectedTheme,
        useSwipes: isUseSwipes,
        useTeleport: isUseTeleport,
      },
      updateBoardSize,
      updateDifficulty,
      updateTheme,
      updateUseSwipes,
      updateTeleport,
    },
  }: ISettingsStore = useStores()

  return (
    <View style={[styles.container, { backgroundColor: c.THEMES[selectedTheme].secondaryColor }]}>
      <StatusBar
        translucent={false}
        backgroundColor={c.THEMES[selectedTheme].secondaryColor}
        barStyle="light-content"
      />
      <ScrollView>
        <View style={styles.row}>
          <Text style={styles.text}>Board size</Text>
          <View style={styles.btnRow}>
            {c.SETTINGS.BOARD_SIZES.map((size, i) => (
              <Button
                key={`${size}-${i}`}
                onPress={() => updateBoardSize(size)}
                style={[
                  styles.btnContainer,
                  {
                    backgroundColor:
                      selectedBoardSize === size
                        ? c.THEMES[selectedTheme].primaryColor
                        : c.THEMES[selectedTheme].darkerPrimaryColor,
                  },
                ]}
              >
                <Text style={[styles.btnText, { color: c.THEMES[selectedTheme].secondaryColor }]}>{size}</Text>
              </Button>
            ))}
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Difficulty</Text>
          <View style={styles.btnRow}>
            {c.SETTINGS.DIFFICULTIES.map((difficulty, i) => (
              <Button
                key={`${difficulty}-${i}`}
                onPress={() => updateDifficulty(difficulty)}
                style={[
                  styles.btnContainer,
                  {
                    backgroundColor:
                      difficulty === selectedDifficulty
                        ? c.THEMES[selectedTheme].primaryColor
                        : c.THEMES[selectedTheme].darkerPrimaryColor,
                  },
                ]}
              >
                <Text style={[styles.btnText, { color: c.THEMES[selectedTheme].secondaryColor }]}>
                  {difficulty}
                </Text>
              </Button>
            ))}
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Theme</Text>
          <View style={styles.btnRow}>
            {c.SETTINGS.THEMES.map((theme, i) => (
              <Button
                key={`${theme}-${i}`}
                onPress={() => {
                  updateTheme(theme)
                  if (Platform.OS === 'android') {
                    BackgroundColor.setColor(c.THEMES[theme].secondaryColor)
                  }
                }}
                style={[
                  styles.btnContainer,
                  {
                    backgroundColor:
                      theme === selectedTheme
                        ? c.THEMES[selectedTheme].primaryColor
                        : c.THEMES[selectedTheme].darkerPrimaryColor,
                  },
                ]}
              >
                <Text style={[styles.btnText, { color: c.THEMES[selectedTheme].secondaryColor }]}>{theme}</Text>
              </Button>
            ))}
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Use swipes</Text>
          <View style={styles.btnRow}>
            {c.SETTINGS.USE_SWIPES.map((swipeState, i) => (
              <Button
                key={`${swipeState}-${i}`}
                onPress={() => updateUseSwipes(swipeState)}
                style={[
                  styles.btnContainer,
                  {
                    backgroundColor:
                      swipeState === isUseSwipes
                        ? c.THEMES[selectedTheme].primaryColor
                        : c.THEMES[selectedTheme].darkerPrimaryColor,
                  },
                ]}
              >
                <Text style={[styles.btnText, { color: c.THEMES[selectedTheme].secondaryColor }]}>
                  {swipeState ? 'yes' : 'no'}
                </Text>
              </Button>
            ))}
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Teleportation</Text>
          <View style={styles.btnRow}>
            {c.SETTINGS.TELEPORT.map((teleportState, i) => (
              <Button
                key={`${teleportState}-${i}`}
                onPress={() => updateTeleport(teleportState)}
                style={[
                  styles.btnContainer,
                  {
                    backgroundColor:
                      teleportState === isUseTeleport
                        ? c.THEMES[selectedTheme].primaryColor
                        : c.THEMES[selectedTheme].darkerPrimaryColor,
                  },
                ]}
              >
                <Text style={[styles.btnText, { color: c.THEMES[selectedTheme].secondaryColor }]}>
                  {teleportState ? 'yes' : 'no'}
                </Text>
              </Button>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  )
})

const styles = StyleSheet.create({
  btnContainer: {
    width: wp('24%'),
    height: '100%',
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'center',
  },
  btnRow: { flexDirection: 'row', width: wp('80%'), height: hp('8%'), justifyContent: 'space-between' },
  btnText: { fontSize: 16, fontFamily: c.FONTS.JOYSTIX },
  container: { flex: 1, justifyContent: 'center' },
  row: { padding: 10, alignItems: 'center' },
  text: { color: 'white', fontSize: 20, margin: 9, fontFamily: c.FONTS.JOYSTIX },
})

export { Settings }
