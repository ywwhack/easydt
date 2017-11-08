const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve (to) {
  return path.resolve(__dirname, to)
}

module.exports = {
  entry: {
    index: './src/content/index.ts',
    background: './src/background/index.ts',
    popup: ['react-hot-loader/patch', './src/popup/index.tsx']
  },
  output: {
    path: path.resolve(__dirname, 'package'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: resolve('src'),
        loader: 'tslint-loader',
        enforce: 'pre',
        options: {
          typeCheck: true
        }
      },
      {
        test: /\.tsx?$/,
        include: resolve('src'),
        loaders: [
          'react-hot-loader/webpack',
          'awesome-typescript-loader'
        ]
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './package',
    port: 3100,
    hot: true,
    open: true,
    openPage: 'popup.html'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'popup.html',
      template: resolve('src/popup/index.html'),
      inject: false
    })
  ]
}
