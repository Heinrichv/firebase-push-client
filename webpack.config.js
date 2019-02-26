const webpack = require('webpack'); 
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    entry: {

        //TypeScript Examples
        // 'scripts/typescript/helpers/BrowserStorage': "./src/scripts/typescript/helpers/BrowserStorage.ts",

        //Javascript Examples
        //'scripts/merlin/pariplay/wintingo' : "./src/scripts/merlin/bundleConfig/pariplay.js",
        //'scripts/merlin/helpers/helper' : "./src/scripts/merlin/bundleConfig/helpers.js",
        
        //SASS Examples
        //'css/common/bootstrap': "./src/content/sass/bootstrap/bootstrap.scss"

    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].min.js'
    },
    externals: {
        "jquery" : /^(jquery|\$)$/i
    },
    module: {
        rules: [
            {
                test: /\.txt$/,
                exclude: /node_modules/,
                use: 'raw-loader'
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: "awesome-typescript-loader"
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [".js", ".json", ".jsx", ".css", ".ts", ".scss"]
    },
    plugins: [
        extractSass,
        new webpack.optimize.UglifyJsPlugin()
    ]
};