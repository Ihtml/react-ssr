const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
    // 当前环境为node环境
    target: 'node',
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    externals: [nodeExternals()],
    module: {
        rules: [{
            test: /\.js?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
                // 通过presets设置babel-loader编译的规则
                presets: ['react', 'stage-0', ['env', {
                    targets: {
                        browsers: ['last 2 versions']
                    }
                }]]
            }
        }]
    }
}