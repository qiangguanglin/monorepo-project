const webpack = require('webpack');
const { exec } = require("child_process");
const fs = require('fs');
const util = require("util");
const yargs = require('yargs/yargs');
const { webpackDirs } = require('./config');
const path = require('path');
const chalk = require('chalk');

const { argv: args } = yargs(process.argv.slice(2));
function buildPackages() {
    let packageDirNames = [];
    const packagesDirPath = path.resolve(__dirname, '../packages');
    if (args.all) {
        packageDirNames = webpackDirs;
    } else {
        const resolveDirs = process.cwd()?.split('\/') || [];
        packageDirNames = [].concat(resolveDirs[resolveDirs.length - 1]);
    }
    packageDirNames.forEach(async (v) => {
        const buildPath = path.join(packagesDirPath, v, 'build');
        console.log(chalk.blue(`开始清除${v}包的build文件夹...`));
        await util.promisify(exec)(`rm -rf ${buildPath}`).then(() => {
            // 清空build
            console.log(chalk.green(`清除${v}包build文件夹完成！`));
        }).catch((e) => {
            console.log(chalk.red(`清除${v}包build文件夹失败！`, `失败原因：${e}`));
            throw new Error(e.message);
        });
        console.log(chalk.blue(`开始编译${v}包`));
        const tempWebpackConfigPath = path.resolve(__dirname, `../packages/${v}/webpack.config.js`);
        if (fs.existsSync(tempWebpackConfigPath)) {
            console.log(chalk.gray(`${v}包存在webpack.config.js文件`));
            let buildConfig = require(path.resolve(__dirname, `../packages/${v}/webpack.config.js`));
            buildConfig.entry = path.join(packagesDirPath, v, buildConfig?.entry || './lib/index.js');
            webpack(buildConfig, (err, stats) => {
                if (err) {
                    console.log(chalk.red(`${v}包编译失败`, err.stack || err));
                    if (err.details) {
                        console.log(chalk.red(err.details));
                    }
                    return;
                }
                console.log(stats.toString({
                    colors: true, // 保持输出的颜色
                    chunks: false, // 不输出 chunk 信息
                    children: false, // 如果你正在使用 ts-loader，将这个值设为 true 将会使 tsc 的输出更清晰
                    modules: false, // 不输出模块信息
                    entrypoints: false, // 不输出入口信息
                    assets: true, // 输出资源信息
                    version: true, // 输出版本信息
                    timings: true, // 输出时间信息
                    errors: true, // 输出错误信息
                    warnings: true, // 输出警告信息
                }));

                if (stats.hasErrors()) {
                    // console.error(`${v}包编译失败`, stats.toJson().errors);
                    return;
                }

                if (stats.hasWarnings()) {
                    console.warn(stats.toJson().warnings);
                }
                console.log(chalk.green(`${v}包编译完成！！！`));
            });
        } else {
            console.log(chalk.red(`${v}包缺少webpack.config文件`));
        }

    });
}
buildPackages();
