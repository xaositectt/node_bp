const webpack = require('webpack')
const path = require("path")
const nodeExternals = require('webpack-node-externals')
const StartServerPlugin = require('start-server-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: [
    'webpack/hot/poll?1000',
    './src/index.js'
  ],
  watch: true,
  target: 'node',
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000']
    }),
    'express'
  ],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: 'server.js'
  },
  module: {
    rules: [{
        test: /\.js?$/,
        use: 'babel-loader',
        exclude: /node_modules/
    }]
  },
  plugins: [
    new StartServerPlugin('server.js'),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
        "process.env": {
            "BUILD_TARGET": JSON.stringify('server')
        }
    }),
  ],
  node: {
    fs: 'empty',
    net: 'empty'
  }
}