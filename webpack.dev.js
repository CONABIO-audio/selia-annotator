const path = require('path');
const TARGET_DIR = path.join(
  __dirname,
  'selia_annotator',
  'static',
  'selia_annotator');


module.exports = {
   mode: 'development',
   entry: path.join(__dirname, '/app/index.js'),
   output: {
       filename: 'annotator.js',
       path: TARGET_DIR,
       library: 'annotator',
       libraryTarget: 'var',
   },
   module:{
       rules:[{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
       }]
   },
  watch: true
}
