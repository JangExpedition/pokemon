const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: `${path.resolve(__dirname, "./src")}/app.jsx`,
  output: {
    publicPath: "/",
    // path: path.resolve(__dirname, "dist"),
    // filename: "main.js",
    clean: true,
  },
  resolve: {
    extensions: [".js", ".jsx"], // 여기에 사용하는 확장자를 추가
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new HtmlPlugin({
      template: "./index.html",
    }),
    new CopyPlugin({
      patterns: [{ from: "static" }],
    }),
  ],

  devServer: {
    host: "localhost",
    open: true,
    historyApiFallback: true,
  },
};
