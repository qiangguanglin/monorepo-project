const fs = require('fs');
const { exec } = require("child_process");
const util = require("util");
const path = require('path');
const { build } = require('esbuild');
const  yargs = require('yargs/yargs');
const _merge = require('lodash/merge');
const { ignoreDirs, webpackDirs } = require('./config');

const { argv:args } = yargs(process.argv.slice(2));
async function buildPackages() {
    let packageDirNames = [];
    const packagesDirPath = path.resolve(__dirname, '../packages');
    if(args.all) {
        const dirNames = await fs.promises.readdir(packagesDirPath, { withFileTypes: true });
        packageDirNames = dirNames.filter(dirent => dirent.isDirectory() && !ignoreDirs.includes(dirent.name) && !webpackDirs.includes(dirent.name)).map(dirent => dirent.name);
        console.log('packageDirNames: ', packageDirNames);
    } else {
        const resolveDirs = process.cwd()?.split('\/') || [];
        packageDirNames = [].concat(resolveDirs[resolveDirs.length-1]);
    }
    packageDirNames.forEach(async v => {
        const buildPath = path.join(packagesDirPath, v, 'build');
        // 清空build
        await util.promisify(exec)(`rm -rf ${buildPath}`);
        const conf = require(path.resolve(__dirname, `../packages/${v}/package.json`));
        let buildConfig = {};
        const tempEsbuildConfigPath = path.resolve(__dirname, `../packages/${v}/esbuild.config.js`);
        if (fs.existsSync(tempEsbuildConfigPath)) {
            console.log(`${v}包存在esbuild.config.js文件`);
            buildConfig = require(path.resolve(__dirname, `../packages/${v}/esbuild.config.js`));
            buildConfig.entryPoints = buildConfig.entryPoints.map(vv => path.join(packagesDirPath, v, vv));
            buildConfig.outdir = path.join(packagesDirPath, v, buildConfig.outdir);
        }
        const tempPath = path.join(packagesDirPath, v, './lib/index.js');
        const defaultConfig = {
            entryPoints: [tempPath],
            outdir: buildPath,
            platform: "node",
            bundle: true,
            minify: true,
            treeShaking: true,
            minify: true,
            sourcemap: false,
            define: {
                VERSION: JSON.stringify(conf.version),
            },
        }
        const mergeConfig = _merge(defaultConfig, buildConfig);
        await build(mergeConfig);
        console.log(`${conf.name}包编译成功...\n`);
    })
}

buildPackages();