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
          "@src":"./src",
          "@components": "./src/components",
          "@assets": "./src/assets",
          "@Pages": "./src/Pages",
          "@routes": "./src/routes",
          "@store": "./src/store",
          "@utils": "./src/utils",
          "@interfaces":"./src/interfaces.ts"
        }
      }]
    ],
  }
}