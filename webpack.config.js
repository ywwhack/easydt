const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    index: './src/content/index.ts',
    popup: './src/popup/index.tsx'
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
        loader: 'ts-loader'
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
