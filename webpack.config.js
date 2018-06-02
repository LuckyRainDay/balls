const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

var project_dir = path.resolve(__dirname, './build/');

balls = {
    // devtool: 'source-map',
    entry: './src/js/baseballs/static_ball.js',
    output: {
        path: path.resolve(project_dir, './js/'),
        filename: '[name].js',
        publicPath: '/build/js/'
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
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
        // new HtmlWebpackPlugin({
        //     template: __dirname + "/html/index.html"
        // }),
        // new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.optimize.UglifyJsPlugin(),
        // new ExtractTextPlugin("style.css")
    ]
}

module.exports = balls;