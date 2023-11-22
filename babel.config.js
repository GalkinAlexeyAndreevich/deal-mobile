module.exports = (api) => {
  api.cache(true)
  return {
    "env": {
      "development": {
        "plugins": [
          "@babel/transform-react-jsx-source",
        ]
      }
    },
    presets: [
			'babel-preset-expo',
		],
    plugins: [
      'react-native-reanimated/plugin',
    ],
  }
}