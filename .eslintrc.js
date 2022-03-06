module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  env: {
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base/legacy',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  ignorePatterns: ['.eslintrc.js'],
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'no-console': 'off',
    semi: [2, 'always'],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
  },
};
