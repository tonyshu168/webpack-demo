const MinicssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');

const PurifyCSS = require('purifycss-webpack');
const glob = require('glob-all');

const prodConfig = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MinicssExtractPlugin.loader,
            options: {
              // hmr: true
              publicPath: '../'
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
              // hmr: true
              publicPath: '../'
            }
          },
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
    ]
  },
  optimization: {
    usedExports: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        // 压缩HTML文件
        removeComments: true,        // 移除HTML中的注释
        collapseWhitespace: true,    // 删除空白符与换行符
        minifyCSS: true              // 压缩内联css
      }
    }),
    new MinicssExtractPlugin({
      filename: 'css/[name]-[contenthash:6].css'
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),   // 这里制定了引擎, 不批定默认也是cssnano
    }),
    new PurifyCSS({
      paths: glob.sync([
        // 要做 CSS Tree Shaking 的路径文件
        path.resolve(__dirname, './src/*.html'),   // 请注意，我们同样需要对 html 文件进行 tree shaking
        path.resolve(__dirname, './src/*.js'),
      ])
    })
  ]
}

module.exports = merge(baseConfig, prodConfig);