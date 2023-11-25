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
      '@babel/plugin-proposal-export-namespace-from',
      ["module-resolver", {
        "extensions": [
          ".ios.js",
          ".android.js",
          ".ios.jsx",
          ".android.jsx",
          ".js",
          ".jsx",
          ".json",
          ".ts",
          ".tsx"
        ],
        "root": [
          "."
        ],
        "alias": {
          "@components": "./src/components",
          "@assets": "./src/assets",
          "@Pages": "./src/Pages",
          "@store": "./src/sore",
          "@utils": "./src/utils",
          "@interfaces":"./src/interfaces.ts"
        }
      }]
    ],
  }
}