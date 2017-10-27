const path = require('path')

module.exports = {
  entry: {
    index: './src/index.ts',
    popup: './src/popup.ts'
  },
  output: {
    path: path.resolve(__dirname, 'package'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
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
