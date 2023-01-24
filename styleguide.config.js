const path = require("path");

const docs = path.resolve(__dirname);
const root = docs.replace("/docs", "");

const customWebpack = {
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist",
  },
  module: {
    rules: [
      // Babel loader will use your project’s babel.config.js
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-typescript"],
          },
        },
      },
      // Other loaders that are needed for your components
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
};

module.exports = {
  styleguideDir: "docs",
  components: `${root}/components/**/[A-Z]*.{js,jsx,ts,tsx}`,
  webpackConfig: customWebpack,
  require: [path.join(__dirname, "./styles/globals.css")],
};
