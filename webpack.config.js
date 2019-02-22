const path = require("path");

module.exports = {
  mode: 'development',
  entry: './src/js/server.js',
  output: {
    path: path.resolve(__dirname, "public"),
    filename: 'bundle.js'
  },
  externals: ['express'],
  node: {
    fs: 'empty',
    net: 'empty'
  }
}