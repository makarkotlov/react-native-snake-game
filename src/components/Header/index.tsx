import React, { ReactNode } from 'react'
import { observer } from 'mobx-react'
import { StyleSheet, View, TouchableNativeFeedback, ViewStyle, Platform, TouchableOpacity } from 'react-native'

import { HugeTitle } from 'components/Text'

import SettingsStore from 'stores/SettingsStore'

import c from '@constants'

type SideViewProps = {
  node: ReactNode
  onPress: () => void
  isDisabled?: boolean
}

type HeaderProps = {
  title?: string
  caption?: string
  style: ViewStyle
  centerNode?: ReactNode
  leftView?: SideViewProps
  rightView?: SideViewProps
}

const headerHeight = 50

const SideView = ({ node, isDisabled = false, onPress, ...rest }: SideViewProps) => {
  const { theme } = SettingsStore.settings

  return Platform.OS === 'android' ? (
    <View style={styles.sideView}>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(c.THEMES[theme].darkerPrimaryColor, true)}
        onPress={onPress}
        disabled={isDisabled}
        style={{ width: '100%', height: '100%' }}
        {...rest}
      >
        <View style={styles.sideViewInner}>{node}</View>
      </TouchableNativeFeedback>
    </View>
  ) : (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.5}
      style={{ width: headerHeight, height: headerHeight }}
      {...rest}
    >
      <View style={styles.sideView}>{node}</View>
    </TouchableOpacity>
  )
}

export const Header = ({ title, caption, style, leftView, rightView, centerNode }: HeaderProps) => {
  const { theme } = SettingsStore.settings

  return (
    <View style={[styles.root, style]}>
      {!!leftView && <SideView {...leftView} />}
      <View style={styles.centerView}>
        {centerNode || (
          <>
            <HugeTitle textAlign="center" numberOfLines={1} color={c.THEMES[theme].lightColor}>
              {title}
            </HugeTitle>
            {!!caption && (
              <HugeTitle textAlign="center" numberOfLines={1} color={c.THEMES[theme].lightColor}>
                {caption}
              </HugeTitle>
            )}
          </>
        )}
      </View>
      {!!rightView && <SideView {...rightView} />}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    height: headerHeight,
    paddingTop: 0,
    flexDirection: 'row',
  },
  centerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sideView: {
    height: headerHeight,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: headerHeight,
    marginHorizontal: 15,
    borderRadius: headerHeight / 2,
    overflow: 'hidden',
    position: 'absolute',
  },
  sideViewInner: {
    width: headerHeight,
    height: headerHeight,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
})

export default observer(Header)
