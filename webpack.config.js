const path  = require("path")
var HtmlWebpackPlugin = require("html-webpack-plugin")
// const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
 mode: "development",
 entry: ["./src/index.js","E:/wrk/shop again/src/main.css"],
 output: {
  filename: "main.[contentHash].js",
  path: path.resolve(__dirname,"dist")
 },
 plugins: [new HtmlWebpackPlugin({
  template:"./src/template.html"
 })
 // , new MiniCssExtractPlugin()
],
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
}