import React, { useState, useLayoutEffect, useRef } from 'react'
import { observer } from 'mobx-react'
import SplashScreen from 'react-native-splash-screen'
import { StackScreenProps } from '@react-navigation/stack'
import BackgroundColor from 'react-native-background-color'
import { StyleSheet, StatusBar, View, Text, Animated, Platform } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

import FlexContainer from 'components/Layout/FlexContainer'

import SettingsStore from 'stores/SettingsStore'

import { useInterval } from 'hooks'

import c from '@constants'
import { LoadingStackRoutes } from 'navigator/stacks/LoadingStack/routes'
import { LoadingStackParamsList } from 'navigator/stacks/LoadingStack/types'

const loadingTick = 3
const loadingDuration = c.LOADING_DURATION / (100 / loadingTick)

type Props = StackScreenProps<LoadingStackParamsList, LoadingStackRoutes.Loading>

const Loading = (props: Props) => {
  const { theme } = SettingsStore.settings

  const [progress, setProgress] = useState(0)
  const [isIntervalRunning, setIsIntervalRunning] = useState(false)
  const animation = useRef(new Animated.Value(0))

  const width = animation.current.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  })

  useLayoutEffect(() => {
    if (Platform.OS === 'android') {
      BackgroundColor.setColor(c.THEMES[theme].secondaryColor)
      SplashScreen.hide()
    }

    setIsIntervalRunning(true)
  }, [])

  useLayoutEffect(() => {
    Animated.timing(animation.current, {
      toValue: progress,
      duration: loadingDuration,
      useNativeDriver: false,
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
    isIntervalRunning ? loadingDuration : 0
  )

  return (
    <FlexContainer style={{ backgroundColor: c.THEMES[theme].secondaryColor }}>
      <StatusBar translucent={false} backgroundColor={c.THEMES[theme].secondaryColor} barStyle="light-content" />
      <View style={styles.wrapper}>
        <Text style={styles.title}>Loading</Text>
        <Animated.View style={[styles.progressBar, { width }]} />
        <Text style={styles.title}>{progress}%</Text>
      </View>
    </FlexContainer>
  )
}

const styles = StyleSheet.create({
  progressBar: {
    backgroundColor: 'white',
    height: hp('2%'),
    alignSelf: 'flex-start',
  },
  title: {
    color: 'white',
    fontSize: hp('4%'),
    fontFamily: c.FONTS.JOYSTIX,
    textAlign: 'center',
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: hp('15%'),
    width: wp('80%'),
  },
})

export default observer(Loading)
