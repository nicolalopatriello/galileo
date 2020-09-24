module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        loader: 'istanbul-instrumenter-loader',
        options: {esModules: true},
        enforce: 'post',
        include: [
          require('path').join(__dirname, '..', 'projects/galileo-app/src'),
          require('path').join(__dirname, '..', 'projects/galileo/src')
        ],
        exclude: [
          /\.(e2e|spec)\.ts$/,
          /node_modules/,
          /dist/,
          /(ngfactory|ngstyle)\.js/
        ]
      }
    ]
  }
};
