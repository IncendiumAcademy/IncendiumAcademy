const path = require("path");

module.exports = {
  context: path.join(__dirname, "webpack"),
  entry: {
    global: "./global.js",
    home: "./home.js",
    sidebar: "./sidebar.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "assets/js"),
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: [path.resolve(__dirname, "node_modules")],
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                corejs: 3,
                useBuiltIns: "usage",
              },
            ],
          ],
        },
      },
    ],
  },
  resolve: {
    extensions: [".json", ".js", ".jsx"],
  },
};
