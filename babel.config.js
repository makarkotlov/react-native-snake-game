module.exports = function (api) {
  api.cache.forever()

  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      '@babel/plugin-proposal-optional-chaining',
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true,
        },
      ],
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.js', '.ts', '.tsx', 'json'],
        },
      ],
    ],
  }
}
