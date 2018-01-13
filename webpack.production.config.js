var webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'src', 'App.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

process.env.NODE_ENV = 'dev';

const basePlugins = [
  new webpack.DefinePlugin({
    __DEV__: false,
    __PRODUCTION__: true,
    process: {
      env: {
        NODE_ENV: '"production"'
      }
    }
  }),
  // path is relative to ./public/build
  new ExtractTextPlugin('./style.css', {
    allChunks: true
  })
];

const plugins = basePlugins;

const babelSettings = {
  presets: [
      'react',
      'es2015',
      'stage-0'
  ]
};

var config = {

  // We change to normal source mapping
  devtool: 'source-map',
  entry: mainPath,
  output: {
    path: buildPath,
    filename: 'bundle.js'
  },
  plugins: plugins,
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel?' + JSON.stringify(babelSettings)],
        exclude: [nodeModulesPath]
      },{
        test: /\.css$/,
        loader: 'style!css'
      },{
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass')
      },
       // Images
       {
         test: /\.(png|jpg)$/,
         loader: 'url-loader?limit=8192!' // inline base64 URLs for <=8k images, direct URLs for the rest
      }
    ]
  }
};

module.exports = config;
