const doMinimize = process.argv.indexOf('--optimize-minimize') !== -1;
const outputFilename = doMinimize ? 'build/kintone-js.min.js' : 'build/kintone-js.js';

module.exports = {
    entry: './src/main.ts',
    output: {
        filename: outputFilename,
        library: 'kintoneJS'
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".js"]
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }
        ]
    }
};
