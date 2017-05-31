// import exec from 'script-loader!./script.js';
module.exports = {
  devtool: 'inline-source-map',
  entry: './main.js',
  output: {
    path: './',
    filename: './public/javascripts/bundle.js'
  },
  devServer: {
    inline: true,
    port: 3333
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      },
    ]
  },
  resolve: {
    modulesDirectories: [
      'client',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx']
  }
};
