const path = require('path')
const nodeExternals = require('webpack-node-externals')
const merge = require('webpack-merge')
const config = require('./webpack.base.js')

const serverConfig = {
    // 当前环境为node环境
    target: 'node',
    mode: 'development',
    entry: './src/server/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    externals: [nodeExternals()],
    module: {
        rules: [{
            test: /.css?$/,
            use: ['isomorphic-style-loader', {
                loader: 'css-loader',
                options: {
                    importLoaders: 1, //接下来要执行loader的数目
                    modules: {
                        localIdentName: '[name]_[local]_[hash:base64:5]'
                    }
                }
            }]
        }]
    }
}
module.exports = merge(config, serverConfig)
