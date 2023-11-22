const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  config.module.rules.forEach(rule => {
    if (rule.oneOf instanceof Array) {
      rule.oneOf[rule.oneOf.length - 1].exclude = [/\.(js|mjs|jsx|cjs|ts|tsx)$/, /\.html$/, /\.json$/]
    }
    return rule
  })
  // config.externals= {
  //   "react-native": true,
  // }
  

  return config;
};

// const path = require("path")
// module.exports = [
//   {
//     entry:"./src/index.tsx",
//     mode:"development",
//     output:{
//       path:path.resolve(__dirname,"dist"),
//       filename:"bundle.js"
//     },
//     resolve:{
//       extensions:[".js",".ts",".tsx",".jsx"]
//     },
//     module:{
//       rules:[
//         {
//           test:/\.(ts|tsx)$/,
//           exclude:/node_modules/,
//           use:"ts-loader",
//         },
//         {
//           test:/\.(js|jsx)$/,
//           exclude:/node_modules/,
//           use:{
//             loader:"babel-loader",
//             options: {
//               presets:["@babel/preset-env", "@babel/preset-react","@babel/preset-typescript"]
//             }
//           },
//         }
//       ]
//     }
//   }
// ]