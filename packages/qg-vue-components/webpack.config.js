const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { ProgressPlugin } = require('webpack');

module.exports = {
    mode: 'development',
    entry: './lib/index.ts', // 项目的入口文件
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.vue'],
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    'vue-loader',
                    'ts-loader'
                ]
            },
            {
                test: /\.ts$/, // 添加这个规则来处理.ts文件
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                    configFile: path.resolve(__dirname, 'tsconfig.json'),
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new ProgressPlugin(),
    ],
};
