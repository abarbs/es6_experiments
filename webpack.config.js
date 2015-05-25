/*
Webpack config "inspired by" example at
https://github.com/webpack/webpack-with-common-libs/blob/617e7757868653854a7f32a73293efb4454c707d/webpack.config.js
*/

var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  cache: true,
  entry: [
    // js entry point
    './app/scripts/main.js',
    // css entry point (bundle all css required/included from main.css)
    './app/style/main.css'
  ],
  // According to docs, resolve.root must be an *absolute* path!
  resolve: {root: path.resolve(__dirname, 'app/scripts')},
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: "[name].js",
    chunkFilename: "[chunkhash].js"
  },
  module: {
    loaders: [
      // required to have a css "entry-point", allows us to include styles in <link>'s as usual, with the benefit of
      // css being bundled by webpack
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, 'app/style')],
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },

      // Load all js modules through Babel, which will include runtime support if necessary
      // (e.g. if using es6 generators)
      {test: /\.js$/, include: [path.resolve(__dirname, 'app/scripts')], loader: "babel-loader?optional[]=runtime"}
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ],
  devServer: {
    contentBase: 'app'
  }
};

