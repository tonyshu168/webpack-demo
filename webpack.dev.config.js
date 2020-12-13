// webpack.dev.config.js
const { HotModuleReplacementPlugin } = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");

const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base.config.js");

const devConfig = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
      },
    ],
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    open: true,
    hot: true,
    hotOnly: true,
    port: 10086,
    proxy: {
      "/api": {
        target: "http://localhost:9092",
      },
    },
  },
  plugins: [
    new htmlWebpackPlugin({
      title: 'My App',
      template: "./src/index.html",
      filename: "index.html",
    }),
    new HotModuleReplacementPlugin(),
  ],
};

module.exports = merge(baseConfig, devConfig);