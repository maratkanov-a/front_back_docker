'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    devServer: {
        inline: true,
        port: 3010
    },

    entry: './static/js/index.js',

    output: {
        filename: "./build/js/build.js",
        library: "home"
    },

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: "cheap-source-map",

    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin('./build/css/bundle.css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            mangle: true,
            sourcemap: false,
            beautify: false,
            dead_code: true
        })
    ]


};