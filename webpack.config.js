const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

let mode = "development";
if (process.env.NODE_ENV === "production") {
  mode = "production";
}

const plugins = [
  new HtmlWebpackPlugin({
    template: "./src/index.html",
  }),
];

module.exports = {
  mode,
  plugins,
  entry: { main: ["@babel/polyfill", "./src/index.ts"] },
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".ts"],
  },
  module: {
    rules: [
      { test: /\.(html)$/, use: ["html-loader"] },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.s[ac]ss$/, use: ["css-loader", "sass-loader"] },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-typescript"],
          },
        },
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "assets/[hash][ext][query]",
    clean: true,
  },
  devServer: {
    hot: true,
  },
};
