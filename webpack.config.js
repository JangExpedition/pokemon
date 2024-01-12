const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "./src/index.jsx"),
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    clean: true,
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@app": path.resolve(__dirname, "./src/App"),
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.module\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
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
      patterns: [{ from: "public" }],
    }),
  ],

  devServer: {
    host: "localhost",
    open: true,
    historyApiFallback: true,
  },
};
