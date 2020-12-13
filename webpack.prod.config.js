const MinicssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  module: {
    roles: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MinicssExtractPlugin,
            options: {
              hmr: true
            }
          },
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MinicssExtractPlugin.loader,
            options: {
              hmr: true
            }
          },
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new MinicssExtractPlugin({
      filename: '[name].css'
    })
  ]
}