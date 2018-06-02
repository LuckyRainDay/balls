var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');


var port = 8888; // 开发机端口限制在8000~9000

exports.port = port;
// for (var key in config.entry) {
//   config.entry[key].unshift('webpack/hot/dev-server')
//   config.entry[key].unshift('webpack-dev-server/client?http://localhost:'+port)
// }

config.plugins.push(new webpack.HotModuleReplacementPlugin());

new WebpackDevServer(webpack(config), {
  hot: true,
  publicPath: config.output.publicPath,
  historyApiFallback: true,
  proxy: {

  },
  stats: {
    chunks: false,
    chunkModules: false,
    colors: true
  },
}).listen(port, '0.0.0.0', function (err, result) {
  if (err) {
      return console.log(err);
  }

  console.log('Listening at http://localhost:' + port + '/');
});
