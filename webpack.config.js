/*
 * Isomorphic Javascript library for Minio Browser JSON-RPC API, (C) 2016 Minio, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var webpack = require("webpack")
var path = require('path')
var CopyWebpackPlugin = require('copy-webpack-plugin')

var exports = {
  context: __dirname,
  entry: [
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

if (process.env.NODE_ENV === 'dev') {
  exports.entry = [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    path.resolve(__dirname, 'app/index.js')
  ]
}

module.exports = exports
