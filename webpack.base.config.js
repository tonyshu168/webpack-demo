const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    // filename: '[name]-[chunkhash:8].js',   // webpack.HotModuleReplacementPlugin() no use chunkhash contextHash
    filename: '[name]-[hash:6].js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|webp|gif)$/,
        exclude: /node_modlues/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024 * 3,
              name: '[name]_[hash:6].[ext]',
              outputPath: 'assets'
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        exclude: /node_modules/,
        use: 'file-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // use: {
        //   loader: 'babel-loader',
        //   options: {
        //     presets: ['@babel/preset-env']
        //   }
        // }
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}