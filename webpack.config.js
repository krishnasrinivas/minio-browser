var webpack = require("webpack")
var path = require('path')
var CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  context: __dirname,
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    path.resolve(__dirname, 'app/index.js')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
              presets: ['react', 'es2015']
            }
      }, {
        test: /\.less$/,
        loader: 'style!css!less'
      }, {
        test: /\.css$/,
        loader: 'style!css'
      }, {
        test: /\.(eot|woff|woff2|ttf|svg|png)/,
        loader: 'url'
      }]
  },
  plugins: [
    new CopyWebpackPlugin([
      {from: 'bower_components/jquery/dist/jquery.min.js'},
      {from: 'bower_components/jquery-ui/jquery-ui.min.js'},
      {from: 'bower_components/jQuery-contextMenu/dist/jquery.contextMenu.min.js'},
      {from: 'bower_components/bootstrap/dist/js/bootstrap.min.js'},
      {from: 'bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js'},
      {from: 'app/js/functions.js'},
      {from: 'app/index.html'}
    ])
  ]
}
