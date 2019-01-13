module.exports = {
  context: __dirname + '\\src',
  entry: '.\\index.js',
  output: {
    filename: 'main.js',
    path: __dirname + '/dist',
  },
  module: {
      rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
      {
        test: /\.css$/,
        use: 'css-loader',
      }]
    },
};