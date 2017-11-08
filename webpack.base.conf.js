const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve (to) {
  return path.resolve(__dirname, to)
}

module.exports = {
  entry: {
    index: './src/content/index.ts',
    background: './src/background/index.ts'
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
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'popup.html',
      template: resolve('src/popup/index.html'),
      inject: false
    })
  ]
}
