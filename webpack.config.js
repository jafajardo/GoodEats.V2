const path = require('path');
const webpack = require('webpack');

const config = {
  entry: {
    bundle: './src/index',
    vendor: ['redux', 'react-redux', 'react-router']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks: Infinity
    })
  ],
  devServer: {
    historyApiFallback: true
  }
}

module.exports = config;