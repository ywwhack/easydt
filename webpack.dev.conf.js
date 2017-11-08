const path = require('path')
const merge = require('webpack-merge')
const config = require('./webpack.base.conf')

module.exports = merge(config, {
  entry: {
    popup: ['react-hot-loader/patch', './src/popup/index.tsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, 'src'),
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
})
