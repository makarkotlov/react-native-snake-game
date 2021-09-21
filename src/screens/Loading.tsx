import React, { useState, useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import SplashScreen from 'react-native-splash-screen'
import BackgroundColor from 'react-native-background-color'
import { StyleSheet, StatusBar, View, Text, Animated, Platform } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import c from '../constants'
import { useStores } from '../mobx'
import { useInterval } from '../hooks'
import { ISettingsStore } from '../mobx/settingsStore'

const loadingTick = 3
const loadingDuration = c.LOADING_DURATION / (100 / loadingTick)

const Loading = observer(() => {
  const {
    settingsStore: {
      settings: { theme },
    },
  }: ISettingsStore = useStores()
  const [progress, setProgress] = useState(0)
  const [isIntervalRunning, setIsIntervalRunning] = useState(false)
  const animation = useRef(new Animated.Value(0))

  const width = animation.current.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  })

  useEffect(() => {
    if (Platform.OS === 'android') {
      BackgroundColor.setColor(c.THEMES[theme].secondaryColor)
      SplashScreen.hide()
    }
    setIsIntervalRunning(true)
  }, [])

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: progress,
      duration: loadingDuration,
      useNativeDriver: false
    }).start()
  }, [progress])

  useInterval(
    () => {
      if (progress + loadingTick > 100) {
        setIsIntervalRunning(false)
        setProgress(100)
      } else {
        setProgress(progress => progress + loadingTick)
      }
    },
    isIntervalRunning ? loadingDuration : null
  )

  return (
    <View style={[styles.container, { backgroundColor: c.THEMES[theme].secondaryColor }]}>
      <StatusBar translucent={false} backgroundColor={c.THEMES[theme].secondaryColor} barStyle="light-content" />
      <View style={styles.wrapper}>
        <Text style={styles.title}>Loading</Text>
        <Animated.View style={[styles.progressBar, { width }]} />
        <Text style={styles.title}>{progress}%</Text>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  progressBar: { backgroundColor: 'white', height: hp('2%'), alignSelf: 'flex-start' },
  title: { color: 'white', fontSize: hp('4%'), fontFamily: c.FONTS.JOYSTIX, textAlign: 'center' },
  wrapper: { alignItems: 'center', justifyContent: 'space-between', height: hp('15%'), width: wp('80%') },
})

export { Loading }
