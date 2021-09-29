import DeviceInfo from 'react-native-device-info'

export function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function getObjectKeys<O>(object: O) {
  return Object.keys(object) as (keyof O)[]
}

export const hasNotch = DeviceInfo.hasNotch()
