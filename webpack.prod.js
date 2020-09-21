const path  = require("path")
const common  = require("./webpack.common")
const { merge } = require('webpack-merge');

module.exports = merge(common, {
 mode: "production",
 output: {
  filename: "main.[contentHash].js",
  path: path.resolve(__dirname,"dist")
 },
 module: {
  rules: [
   {
    test:/\.css$/,
    // use:[MiniCssExtractPlugin.loader,"css-loader"],
    use:["style-loader","css-loader"]
   }
   // ,
   // {
   //  test:/\.html$/,
   //  use:["html-loader"]
   // },
   // {
   //  test: /\.(svg|png|jpg|gif)$/,
   //  use:{
   //   loader:"file-loader",
   //   options: {
   //    name: "[name].[hash].[ext]",
   //    outputPath:"imgs"
   //   }
   //  }
   // }
  ]
 }
})