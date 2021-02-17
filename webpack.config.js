const TerserPlugin = require("terser-webpack-plugin");
const { execSync } = require("child_process");

let commitHash = execSync('git rev-parse HEAD').toString().trim();

const webpack = require("webpack"),
  path = require("path"),
  srcPath = path.join(__dirname, "src");

module.exports = {
  target: "web",
  cache: true,
  devtool: "source-map",
  mode: "production",
  devServer: {
    contentBase: path.join(__dirname, "public"),
    publicPath: "/"
  },
  entry: {
    app: path.join(srcPath, "app.js"),
    server: "webpack/hot/dev-server",
    devServer: `${require.resolve("webpack-dev-server/client")  }?http://localhost:8082/`,
  },
  resolve: {
    modules: [srcPath, "node_modules"],
    extensions: [".js", ".jsx", ".json"]
  },
  output: {
    path: path.join(__dirname, "build"),
    publicPath: "/",
    filename: "[name].js",
    chunkFilename: "[name].js",
    pathinfo: true
  },
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.js(|x)?$/,
        exclude: /node_modules|thirdParty/,
        use: [{
          loader: "babel-loader"
        }],
      },
      {
        test: /\.worker\.js$/,
        loader: "worker-loader",
        options: { inline: true }
      }
    ]
  },
  optimization: {
    minimizer: [new TerserPlugin({
      terserOptions: {
        output: {
          comments: false,
        },
      },
      extractComments: false
    })]
  },
  plugins: [
    new webpack.DefinePlugin({
      __COMMIT_HASH__: JSON.stringify(commitHash)
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};