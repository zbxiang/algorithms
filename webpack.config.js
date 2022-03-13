const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
const env = require('yargs').argv.env

let libraryName = 'PackDataStructuresAlgorithms'

let pulgins = [],
    outputFile;

if (env === 'build') {
    outputFile = libraryName + '.min.js'
} else {
    outputFile = libraryName + '.js'
}

const config = {
    entry: __dirname + '/src/js/index.js',
    devtool: 'source-map',
    output: {
        path: __dirname + '/examples',
        filename: outputFile,
        library: libraryName,
        libraryTarget: 'umd',
        umdNameDefine: true
    },
    module: {
        rules: [{
            test: /(\.jsx|js)$/,
            loader: 'babel-loader',
            exclude: /(node_modules|bower_components)/
        }, {
            test: /.html$/,
            use: {
                loader: 'html-loader'
            }
        }]
    },
    resolve: {
        modules: [path.resolve('./node_modules'), path.resolve('./src/js')],
        extensions: ['.json', '.js']
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
            })
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: __dirname + 'public/index.html',
            filename: 'index.html'
        })
    ]
}

module.exports = config