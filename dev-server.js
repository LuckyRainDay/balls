const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const path = require('path');

var app = express();
// webpack编译器
var compiler = webpack(webpackConfig);
// 监听的端口号
var port = 8888;

// webpack-dev-server中间件
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
});

app.use(devMiddleware)

// 路由
app.get('/:viewname?', function(req, res, next) {

    var viewname = req.params.viewname 
        ? req.params.viewname + '.html' 
        : 'index.html';

    var filepath = path.join(compiler.outputPath, viewname);
    console.log('filepath = '+filepath)

    // 使用webpack提供的outputFileSystem
    compiler.outputFileSystem.readFile(filepath, function(err, result) {
        if (err) {
            // something error
            return next(err);
        }
        res.set('content-type', 'text/html');
        res.send(result);
        res.end();
    });
});

module.exports = app.listen(port, function(err) {
    if (err) {
        // do something
        return;
    }

    console.log('Listening at http://localhost:' + port + '\n')
})