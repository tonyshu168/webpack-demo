const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const glob = require('glob');
const webpack = require('webpack');

const setMpa = () => {
  const entry = {};
  const htmlwebpackplugins = [];

  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));

  entryFiles.map((item, index) => {
    const match = item.match(/src\/(.*)\/index\.js$/);
    const pageName = match[1];
    entry[pageName] = item;

    htmlwebpackplugins.push(
      new HtmlWebpackPlugin({
        template: path.join(__dirname, `./src/${pageName}/index.html`),
        filename: `html/${pageName}.html`,
        chunks: [pageName]
      })
    );
  });
  return {
    entry,
    htmlwebpackplugins
  }
}

const { entry, htmlwebpackplugins } = setMpa();

module.exports = {
  entry,
  output: {
    // filename: '[name]-[chunkhash:8].js',   // webpack.HotModuleReplacementPlugin() no use chunkhash contextHash
    filename: '[name].js',
    path: path.resolve(__dirname, './dist')
  },
  mode: 'development',
  devtool: 'cheap-module-source-map',
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
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.(png|jpe?g|webp|svg|eot|ttf|woff|woff2)$/,
        exclude: /node_modlues/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
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
    new CleanWebpackPlugin(),
    ...htmlwebpackplugins,
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
    open: true,
    hot: true,
    port: 10086,
    proxy: {
      '/api': {
        target: 'http://localhost:9092'
      }
    }
  }
}