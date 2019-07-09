module.exports = {
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
        }, {
            test: /.css?$/,
            use: ['style-loader', {
                loader: 'css-loader',
                options: {
                    importLoaders: 1, //接下来要执行loader的数目
                    modules: true, //支持CSS的模块化
                    // 自定义CSS类名
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                }
            }]
        }]
    }
}