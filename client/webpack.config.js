const webpack = require('webpack'),
    path = require('path'),
    srcPath = path.join(__dirname, 'src'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

const sassLoaders = [
  'style',
  'css',
  'sass'
];

const babelSettings = {
    presets:[
        'react',
        'es2015'
    ]
};

module.exports = {
    target: 'web',
    entry: {
        module: path.join(srcPath, 'app.js'),
        common: ['react']
    },
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: '',
        filename: '[name].js'
    },
    resolve: {
        root: srcPath,
        extensions: ['', '.js'],
        modulesDirectories: ['node_modules', 'src']
    },
    module: {

        exprContextCritical: false,

        loaders: [
            // Babel
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loaders: ['babel?'+JSON.stringify(babelSettings)],
            },
            // Sass
            {
               test: /\.scss$/,
               loaders: sassLoaders
           }
           // Images
        //    { 
        //        test: /\.(png|jpg)$/, 
        //        loader: 'url-loader?limit=8192' // inline base64 URLs for <=8k images, direct URLs for the rest
        //    }
        ]
    },
    sassLoader: {
        inludePaths: [path.resolve(__dirname, 'src/styles-config/')]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: 'src/index.html'
        })
    ],
    devServer: {
        contentBase: './tmp'
    }
};
