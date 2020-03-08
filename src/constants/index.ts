import { Dimensions } from 'react-native'

interface Theme {
  [key: string]: {
    primaryColor: string
    darkerPrimaryColor: string
    secondaryColor: string
  }
}

const THEMES: Theme = {
  yellow: {
    primaryColor: '#FCDE89',
    darkerPrimaryColor: '#C9AB56',
    secondaryColor: '#424646',
  },
  blue: {
    primaryColor: '#37A6E0',
    darkerPrimaryColor: '#1163F3',
    secondaryColor: '#262626',
  },
  green: {
    primaryColor: '#25E47B',
    darkerPrimaryColor: '#16894A',
    secondaryColor: '#222222',
  },
}

export default {
  MAX_WIDTH: Dimensions.get('screen').width,
  MAX_HEIGHT: Dimensions.get('screen').height,
  FONTS: { JOYSTIX: 'joystix' },
  SETTINGS: {
    BOARD_SIZES: ['15x20', '20x20'],
    DIFFICULTIES: ['low', 'medium', 'high'],
    THEMES: ['yellow', 'blue', 'green'],
    USE_SWIPES: [true, false],
    TELEPORT: [true, false],
  },
  LOADING_DURATION: 2000,
  THEMES,
}
