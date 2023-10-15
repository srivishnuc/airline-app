const path = require('path');

module.exports = {
 mode: 'production',
 entry: path.resolve(__dirname, 'src', 'index.js'),
 output: {
  path: path.resolve(__dirname, 'dist'),
  filename: 'bundle.js',
  publicPath: '/' // Routing issue
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
 }
};
