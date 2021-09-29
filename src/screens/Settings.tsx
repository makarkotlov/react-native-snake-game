import React from 'react'
import { observer } from 'mobx-react'
import { StackScreenProps } from '@react-navigation/stack'
import BackgroundColor from 'react-native-background-color'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, StatusBar, View, Text, Platform, ScrollView } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

import Icon from 'components/Icon'
import Header from 'components/Header'
import Button from 'components/Button'
import FlexContainer from 'components/Layout/FlexContainer'

import SettingsStore from 'stores/SettingsStore'

import { AppStackRoutes } from 'navigator/stacks/AppStack/routes'
import { AppStackParamsList } from 'navigator/stacks/AppStack/types'

import c from '@constants'

type Props = StackScreenProps<AppStackParamsList, AppStackRoutes.Settings>

const Settings = ({ navigation }: Props) => {
  const { settings, updateBoardSize, updateDifficulty, updateTheme, updateUseSwipes, updateTeleport } =
    SettingsStore
  const { boardSize, difficulty: selectedDifficulty, theme: selectedTheme, useSwipes, useTeleport } = settings

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: c.THEMES[selectedTheme].secondaryColor }}>
      <FlexContainer style={{ backgroundColor: c.THEMES[selectedTheme].secondaryColor }}>
        <StatusBar
          translucent={false}
          backgroundColor={c.THEMES[selectedTheme].secondaryColor}
          barStyle="light-content"
        />
        <Header
          title="Settings"
          leftView={{
            node: <Icon name="backIcon" style={{ tintColor: c.THEMES[selectedTheme].lightColor }} />,
            onPress: () => navigation.goBack(),
          }}
          style={{ backgroundColor: c.THEMES[SettingsStore.settings.theme].secondaryColor }}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.row}>
            <Text style={styles.text}>Board size</Text>
            <View style={styles.btnRow}>
              {c.SETTINGS.BOARD_SIZES.map((size, i) => (
                <Button key={`${size}-${i}`} onPress={() => updateBoardSize(size)}>
                  <View
                    style={[
                      styles.btnContainer,
                      {
                        backgroundColor:
                          boardSize === size
                            ? c.THEMES[selectedTheme].primaryColor
                            : c.THEMES[selectedTheme].darkerPrimaryColor,
                      },
                    ]}
                  >
                    <Text style={[styles.btnText, { color: c.THEMES[selectedTheme].secondaryColor }]}>{size}</Text>
                  </View>
                </Button>
              ))}
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Difficulty</Text>
            <View style={styles.btnRow}>
              {c.SETTINGS.DIFFICULTIES.map((difficulty, i) => (
                <Button key={`${difficulty}-${i}`} onPress={() => updateDifficulty(difficulty)}>
                  <View
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
                  </View>
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
                >
                  <View
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
                    <Text style={[styles.btnText, { color: c.THEMES[selectedTheme].secondaryColor }]}>
                      {theme}
                    </Text>
                  </View>
                </Button>
              ))}
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Use swipes</Text>
            <View style={styles.btnRow}>
              {c.SETTINGS.USE_SWIPES.map((swipeState, i) => (
                <Button key={`${swipeState}-${i}`} onPress={() => updateUseSwipes(swipeState)}>
                  <View
                    style={[
                      styles.btnContainer,
                      {
                        backgroundColor:
                          swipeState === useSwipes
                            ? c.THEMES[selectedTheme].primaryColor
                            : c.THEMES[selectedTheme].darkerPrimaryColor,
                      },
                    ]}
                  >
                    <Text style={[styles.btnText, { color: c.THEMES[selectedTheme].secondaryColor }]}>
                      {swipeState ? 'yes' : 'no'}
                    </Text>
                  </View>
                </Button>
              ))}
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Teleportation</Text>
            <View style={styles.btnRow}>
              {c.SETTINGS.TELEPORT.map((teleportState, i) => (
                <Button key={`${teleportState}-${i}`} onPress={() => updateTeleport(teleportState)}>
                  <View
                    style={[
                      styles.btnContainer,
                      {
                        backgroundColor:
                          teleportState === useTeleport
                            ? c.THEMES[selectedTheme].primaryColor
                            : c.THEMES[selectedTheme].darkerPrimaryColor,
                      },
                    ]}
                  >
                    <Text style={[styles.btnText, { color: c.THEMES[selectedTheme].secondaryColor }]}>
                      {teleportState ? 'yes' : 'no'}
                    </Text>
                  </View>
                </Button>
              ))}
            </View>
          </View>
        </ScrollView>
      </FlexContainer>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  btnContainer: {
    width: wp('24%'),
    height: '100%',
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'center',
  },
  btnRow: {
    flexDirection: 'row',
    width: wp('80%'),
    height: hp('8%'),
    justifyContent: 'space-between',
  },
  btnText: {
    fontSize: 16,
    fontFamily: c.FONTS.JOYSTIX,
  },
  row: {
    padding: 10,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
    margin: 9,
    fontFamily: c.FONTS.JOYSTIX,
  },
})

export default observer(Settings)
