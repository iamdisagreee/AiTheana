import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { BuildOptions } from "./types/config";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

export function buildPlugins(
  options: BuildOptions,
): webpack.WebpackPluginInstance[] {
  const buildPlugins = [
    new HtmlWebpackPlugin({
      template: path.resolve(options.paths.html),
    }),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].[contenthash:8].css",
    }),
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(options.isDev),
      __API__: JSON.stringify(options.api),
      __PROJECT__: JSON.stringify(options.project),
    }),
  ];

  // buildPlugins.push(new BundleAnalyzerPlugin({ openAnalyzer: false }));

  if (options.isDev) {
    buildPlugins.push(...[new ReactRefreshWebpackPlugin()].filter(Boolean));
  }

  return buildPlugins;
}
