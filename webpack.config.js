var BUILD = 'dev';
var watch = true;
var devtool = "source-map";
if(process.argv.indexOf("-p") > 0){
  BUILD = 'production';
  watch = false;
  devtool = null;
}
console.log(BUILD)

var webpack = require("webpack");

var config = {
    context:  __dirname ,
    entry: {
        'main': __dirname + '/index.js'
    },
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /(\.css|\.less)$/, loader: 'style-loader!css-loader' },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
            { test: /\.less$/,loader: "style!css!less" },
            {
              loader: "babel",
              exclude: /node_modules/,
              // Only run `.js` and `.jsx` files through Babel
              test: /(\.es6|\.jsx|\.js)$/,
              // Options to configure babel with
              query: {
                plugins: ['transform-runtime'],
                presets: ['es2015', 'stage-0', 'react'],
              }
            },
        ]
    },
    plugins: [

        //new webpack.ProvidePlugin({
          //$: "jquery",
          //jQuery: "jquery",
          //"window.jQuery": "jquery"
        //}),

        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': '"'+BUILD+'"'
          }
        })
    ],
    watch: watch,
    devtool: devtool
    //devtool: "dev"
};

// for building once for production (minification) webpack -p
if (BUILD=='production')
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}))

module.exports = config
