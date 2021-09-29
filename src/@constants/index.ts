import { Dimensions } from 'react-native'

export enum ColorThemes {
  yellow = 'yellow',
  blue = 'blue',
  green = 'green',
}

export enum BoardSizes {
  '15x20' = '15x20',
  '20x20' = '20x20',
}

export enum Difficulties {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

type Theme = {
  [key in ColorThemes]: {
    primaryColor: string
    darkerPrimaryColor: string
    secondaryColor: string
    lightColor: string
  }
}

const THEMES: Theme = {
  yellow: {
    primaryColor: '#FCDE89',
    darkerPrimaryColor: '#C9AB56',
    secondaryColor: '#424646',
    lightColor: 'white',
  },
  blue: {
    primaryColor: '#37A6E0',
    darkerPrimaryColor: '#1163F3',
    secondaryColor: '#262626',
    lightColor: 'white',
  },
  green: {
    primaryColor: '#25E47B',
    darkerPrimaryColor: '#16894A',
    secondaryColor: '#222222',
    lightColor: 'white',
  },
}

export default {
  MAX_WIDTH: Dimensions.get('screen').width,
  MAX_HEIGHT: Dimensions.get('screen').height,
  FONTS: { JOYSTIX: 'joystix' },
  SETTINGS: {
    BOARD_SIZES: [BoardSizes['15x20'], BoardSizes['20x20']],
    DIFFICULTIES: [Difficulties.low, Difficulties.medium, Difficulties.high],
    THEMES: [ColorThemes.yellow, ColorThemes.blue, ColorThemes.green],
    USE_SWIPES: [true, false],
    TELEPORT: [true, false],
  },
  LOADING_DURATION: 1500,
  THEMES,
}
