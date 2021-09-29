module.exports = {
  root: true,
  env: {
    browser: 1,
  },
  extends: ['airbnb', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  ecmaFeatures: {
    jsx: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'import/prefer-default-export': 0,
    'no-use-before-define': 0,
    'arrow-parens': 0,
    'linebreak-style': 0,
    'no-confusing-arrow': 0,
    'implicit-arrow-linebreak': 0,
    'comma-dangle': 0,
    'operator-linebreak': 0,
    'object-curly-newline': 0,
    'function-paren-newline': 0,
    'no-shadow': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/no-array-index-key': 0,
    'no-underscore-dangle': 0,
    'max-len': 0,
    'react/jsx-wrap-multilines': 0,
    'react/jsx-curly-newline': 0,
    'no-return-assign': 0,
    'consistent-return': 0,
    indent: 0,
    quotes: 0,
    semi: 0,
  },
  settings: {
    'import/core-modules': ['react'],
  },
  plugins: ['import', 'react-hooks', 'react', 'promise', 'jsx-a11y', 'react-native'],
}
