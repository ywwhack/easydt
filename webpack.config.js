const path = require('path')

module.exports = {
  entry: {
    index: './src/index.ts',
    background: './src/background.ts'
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
  }
}
