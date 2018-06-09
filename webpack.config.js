const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

var project_dir = path.resolve(__dirname, './dist/');

balls = {
    // devtool: 'source-map',
    entry: './src/js/baseballs/main.js',
    output: {
        path: project_dir,
        filename: '[name]-[hash].js',
        publicPath: '/dist/'
    },
    resolve: {
        alias: {
            'css': path.resolve(__dirname, './src/css'),
            'js': path.resolve(__dirname, './src/js')
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
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('I wanna play balls.'),
        new HtmlWebpackPlugin({
            template: __dirname + "/public/index.html",
            minify: false
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: "./dist/",//对外提供的访问内容的路径
        historyApiFallback: true,//不跳转
        inline: true //实时刷新
    }
}

module.exports = balls;