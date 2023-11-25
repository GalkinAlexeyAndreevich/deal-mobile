const createExpoWebpackConfigAsync = require("@expo/webpack-config");
const path = require("path");
module.exports = async function (env, argv) {
    const config = await createExpoWebpackConfigAsync(
        {
            ...env,
            mode: "development",
            output: {
                path: path.resolve(__dirname, "dist"),
                filename: "bundle.js",
            },
            resolve: {
                extensions: [/\.(js|mjs|jsx|cjs|ts|tsx)$/, /\.html$/, /\.json$/],
            },
            module: {
                rules: [
                    {
                        test: /\.(ts|tsx)$/,
                        exclude: /node_modules/,
                        use: "ts-loader",
                    },
                    {
                        test: /\.(js|jsx)$/,
                        exclude: /node_modules/,
                        use: {
                            loader: "babel-loader",
                            options: {
                                presets: [
                                    "@babel/preset-env",
                                    "@babel/preset-react",
                                    "@babel/preset-typescript",
                                ],
                            },
                        },
                    },
                ],
            },
        },
        argv
    );
    return config;
};
