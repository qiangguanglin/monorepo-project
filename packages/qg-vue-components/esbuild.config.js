const vuePlugin = require('esbuild-plugin-vue');
const cssModulesPlugin = require('esbuild-plugin-css-modules');

module.exports = {
    entryPoints: ['lib/index.js'],
    bundle: true,
    outdir: 'build',
    plugins:[
        vuePlugin.default(),
        cssModulesPlugin()
    ],
    loader: {
        '.css': 'css',
        '.js': 'jsx'
    },
    define: {
        'process.env.NODE_ENV': '"production"',
    },
}