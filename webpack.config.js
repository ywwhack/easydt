const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    index: './src/content/index.ts',
    popup: ['react-hot-loader/patch', './src/popup/index.tsx']
  },
  output: {
    path: path.resolve(__dirname, 'package'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loaders: [
          'react-hot-loader/webpack',
          'awesome-typescript-loader'
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
  }
}
