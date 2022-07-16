const HTMLWebpackPlugin=require('html-webpack-plugin');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');

let mode= 'development';
if(process.env.NODE_ENV==='production'){
    mode='production';
}

console.log(mode);

module.exports={
    mode: mode,
    output:{
        assetModuleFilename:"assets/[hash][ext][query]",
        clean: true,
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new HTMLWebpackPlugin(
            {
                template: './src/index.pug'
            }
        )
    ],

    module:{
        rules:[
            {
                test:/\.pug$/i,
                loader: "pug-loader",
                exclude: /(node_modules|bower_components)/
            },
            {
                test:/\.html$/i,
                loader: "html-loader"
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {loader:"postcss-loader"},
                    "sass-loader"
                ]
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource'
            }
        ]
    }
}