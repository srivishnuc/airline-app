const path = require('path');
const webpack = require('webpack');

module.exports = {
 mode: 'development',
 plugins: [new webpack.HotModuleReplacementPlugin()],
 entry: path.resolve(__dirname, 'src', 'index.js'),
 output: {
  path: path.resolve(__dirname, 'dist'),
  filename: 'bundle.js',
  publicPath: '/' // Routing issue
 },
 devServer: {
  static: {
   directory: path.join(__dirname, 'dist')
  },
  compress: true,
  port: 3000,
  hot: true,
  historyApiFallback: true // Routing issue
 },
 module: {
  rules: [
   {
    test: /\.(js|jsx)$/,
    include: path.resolve(__dirname, 'src'),
    exclude: /node_modules/,
    use: {
     loader: 'babel-loader',
     options: {
      presets: ['@babel/preset-react']
     }
    }
   },
   {
    test: /\.(s(a|c)ss)$/,
    use: ['style-loader', 'css-loader', 'sass-loader']
   },
   {
    test: /\.(jpg|jpeg|gif|png|svg)$/,
    use: {
     loader: 'file-loader',
     options: {
      name: '[name].[ext]',
      publicPath: 'images',
      outputPath: 'images'
     }
    }
   }
  ]
 },
 plugins: [
  new MiniCssExtractPlugin({
   filename: 'styles.[contenthash].css' // Extract and cache-bust CSS
  })
 ]
};
