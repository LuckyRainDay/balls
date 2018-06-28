const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

var project_dir = path.resolve(__dirname, './dist/'); // 打包后文件的存储目录

balls = {
    // devtool: 'source-map',
    entry: {},
    mode: 'development',
    // mode: 'production'
    output: {
        path: project_dir,
        filename: '[name]-[hash].js',
        publicPath: '/dist/'
    },
    resolve: {
        alias: {
            'css': path.resolve(__dirname, './src/css'),
            'js': path.resolve(__dirname, './src/js'),
            'assets': path.resolve(__dirname, '../assets/')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                    plugins: [
                        'transform-runtime',
                        'transform-decorators'
                    ],
                    presets: ['es2015', 'react', 'stage-0']
                }
            },
            {
                test: /\.(css)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true, // 指定启用css modules
                            localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                        }
                    }, {
                        loader: "postcss-loader"
                    }
                ]
            },
            {
                test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
                loader: 'file-loader?name=[name].[ext]'  // <-- retain original file name
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('I wanna play balls.'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: __dirname + "/public/baseballs/index.html",
            chunks: ['baseballs'],
            minify: false,
            favicon: 'assets/img/favicon.ico' // 添加favicon.ico
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: "./dist/",//对外提供的访问内容的路径
        historyApiFallback: true,//不跳转
        inline: true //实时刷新
    },

}

/* 目前添加一个组件默认的目录结构为
 * 
 * html: /public/component_name/index.html
 * 入口JS: /src/js/component_name/main.js
 * CSS: /src/css/component_name/main.css
 * 
*/

// 组件名称
const entries = [
    'baseballs',
    'threejsballs'
];


// 初始化entry
(function setEntries() {
    entries.forEach((item) => {
        balls.entry[item] = [
            'babel-polyfill', //为全局对象添加ES6方法
            './src/js/'+item+'/main.js'
        ]
    });
})();

// 初始化HtmlWebpackPlugin设置
(function setHtmlWebpackPlygins() {
    entries.forEach((item) => {
        balls.plugins.push(
            new HtmlWebpackPlugin({
                filename: item + '/index.html', // html文件的存储路径
                template: path.join(__dirname, 'public', item, '/index.html'), // 读取的模板html的路径
                chunks: [item], // 加载的JS、CSS文件
                minify: false,
                favicon: 'assets/img/favicon.ico' // 添加favicon.ico
            })
        );
    });
})();

module.exports = balls;