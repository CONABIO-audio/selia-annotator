const path = require('path');

const TARGET_DIR = path.join(
    __dirname,
    'selia_annotator',
    'static',
    'selia_annotator',
);

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, '/app/index.ts'),
    output: {
        filename: 'annotator.js',
        path: TARGET_DIR,
        library: 'annotator',
        libraryTarget: 'var',
    },
    module: {
        rules: [
            {
                test: [/\.ts$/, /\.tsx$/],
                use: 'ts-loader',
                exclude: '/node_modules/',
            },
            {
                test: [/\.js$/, /\.jsx$/],
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    watch: true,
};
