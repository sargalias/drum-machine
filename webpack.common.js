const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const webpack = require('webpack');

module.exports = env => {
  if (env.prod === undefined) {
    env.prod = true;
  }

  const sourceMap = !env.prod;

  return {
    entry: './src/index.jsx',
    output: {
      filename: '[name].[contenthash].js',
      chunkFilename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        testUtils: path.resolve(__dirname, 'testUtils/'), // because ESLint reads from webpack alias
      },
    },
    module: {
      rules: [
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          use: [
            'babel-loader',
            {
              loader: 'eslint-loader',
              options: { emitWarning: !env.prod },
            },
          ],
        },
        {
          test: /\.s?css$/,
          use: [
            {
              loader: env.prod ? MiniCssExtractPlugin.loader : 'style-loader',
              options: {
                sourceMap,
              },
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap,
                modules: true,
                localIdentName: '[local]--[hash:base64:5]',
              },
            },
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap,
              },
            },
            {
              loader: 'sass-resources-loader',
              options: {
                resources: ['./src/abstracts/resources/*.scss'],
                /*
                  These will be included in every file.
                  Make sure you only globally include Scss things like Scss variables and mixins.
                  Don't include CSS things like CSS custom properties as they'll be imported multiple times in your CSS files.
                  */
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|tff|otf)$/,
          use: ['file-loader'],
        },
      ],
    },
    optimization: {
      runtimeChunk: 'single',
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      new StyleLintPlugin({
        emitErrors: env.prod,
      }),
      new webpack.HashedModuleIdsPlugin(),
    ],
  };
};
