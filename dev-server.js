const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const path = require('path');
var WebpackDevMiddleware = require('webpack-dev-middleware');
var WebpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');

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
        chunks: false,
        chunkModules: false
    }
});

app.use(devMiddleware)
app.use(WebpackHotMiddleware(compiler))

config.plugins.push(new webpack.HotModuleReplacementPlugin());

// 首页/默认页面 路由
app.get('/', function(req, res, next) {
    var filepath = path.join(compiler.outputPath, 'index.html');
    sendHTML(filepath, res, next);
})

// 页面/子路径 路由逻辑
app.get('/:viewname?', function(req, res, next) {
    var filename = req.params.viewname || '';
    // 如果存在viewname，且viewname没有文件后缀，则添加'.html'的文件后缀
    filename = (filename && filename.indexOf('.') === -1) ? (filename+'/index.html') : filename;
    console.log('viewname = '+req.params.viewname+'; filename = '+filename);

    // 如果不是以html结尾，则不走下面的步骤
    if(filename.endsWith('.html') === -1) {
        return ;
    }

    var viewname = req.params.viewname ? filename : 'index.html';

    var filepath = path.join(compiler.outputPath, viewname);
    console.log('filepath = '+filepath)

    sendHTML(filepath, res, next);
});


app.get('/:model/:viewname?', function(req, res, next) {
    console.log('req.params = '+req.params);
});


// 获取指定HTML文件并返回
function sendHTML(filepath, res, next) {
    // 使用webpack提供的outputFileSystem
    try {
        compiler.outputFileSystem.readFile(filepath, function(err, result) {
            if (err) {
                // something error
                return next(err);
            }
            res.set('content-type', 'text/html');
            res.send(result);
            res.end();
        });
    } catch(e) {
        res.send('路径错误，请输入正确路径！');
    }
}

// 监听端口
module.exports = app.listen(port, function(err) {
    if (err) {
        // do something
        console.error('err = '+err);
        return;
    }

    console.log('Listening at http://localhost:' + port + '\n')
})