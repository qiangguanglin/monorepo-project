const vuePlugin = require('esbuild-plugin-vue');
const cssModulesPlugin = require('esbuild-plugin-css-modules');

module.exports = {
    entryPoints: ['lib/index.js'], // 入口文件，可多个，默认会有多个输出文件
    bundle: true, // 打开打包，将入口文件关联模块打包
    outdir: 'build', // 输出文件夹
    // 是否分块
    // 多个入口点之间共享的代码被分成两个入口点导入的单独的共享文件
    // 通过异步import()表达式引用的代码将被拆分到一个单独的文件中，并且仅在计算该表达式时才加载
    splitting: true, 
    platform: 'browser', 
    plugins:[
        vuePlugin.default(),
        cssModulesPlugin()
    ],
    // 指定匹配到的文件使用什么loader
    // loader是指定的，不支持自定义loader
    // 不过可以先通过自定义的脚本处理完相应的文件之后，再通过esbuild打包
    loader: {
        '.css': 'css',
        '.js': 'jsx'
    },
    
    /**
     * 输出文件格式
     * @param iife 立即调用函数表达式,默认值
     * @param cjs CommonJS模块，node
     * @param esm：ECMAScript模块，浏览器
     * @param umd：支持多种模块系统的格式，包括CommonJS，AMD和全局变量
     */
    format: 'esm',
    define: {
        'process.env.NODE_ENV': '"production"',
    },
    chunkNames: 'build/chunks/[name]-[hash]', // 指定输出文件中代码块（chunk）的命名规则
    // 指定平台
    // browser：表示node内置模块标记为外部模块，这些模块不会被包含在最终的打包文件中
    // node：node内置模块包含在内，这可能会增加包的体积
    // neutral：不会做任何特定平台的假设，它不会自动将node:内置模块标记为外部模块，也不会自动将它们包含在内。你需要自己决定如何处理这些模块
    // tsconfig: '',指定ts的配置项
    /**
     * 在打包后文件的顶部部增加注释
    */ 
    // banner: {
    //     js: '//comment',
    //     css: '/*comment*/',
    // },

    /**
     * 在打包后文件的底部增加注释
    */ 
    // footer: {
    //     js: '//comment',
    //     css: '/*comment*/',
    //},

    /**
     * 全局变量名
     * 仅针对iife，立即执行函数的全局变量名
     */
    // globalName: 'xyz',

    /**
     * @param none 不保留注释
     * @param inline 保留所有注释
     * @param eof 将注释移动到末尾
     * @param linked 将所有注释移至.LEGAL.txt文件中并通过评论链接到它们
     * @param external 将所有注释移至.LEGAL.txt文件中，但不链接到它们
     * 
     */
    //  legalComments: 'none',
    // lineLimit: 80, // 行限制，超过多少字符换行
    // assetNames: 'assets/[name]-[hash]', // 指定输出文件中静态资源的命名规则。静态资源包括图片、字体、音频、视频等文件
    // entryNames: '[dir]/[name]-[hash]', // 入口点的文件名
    // outExtension: { '.ts': '.js' }, // 输出文件拓展名
    // outbase: 'build', // 输出文件的基本路径
    // outfile: 'outFile', // 输出文件的路径和文件名，仅用于单个入口点
    // publicPath: '/assets', // 指定生成的资源文件（如图片、字体等）在HTML中的公共URL路径
    // write: false, // 是否写入缓冲区
    // 用一个包替换另一个包
    // alias: {
        //'oldpkg' : 'newpkg' , 
    //},
    // ...
}