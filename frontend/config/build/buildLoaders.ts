import webpack from "webpack";
import { BuildOptions } from "./types/config";
import ReactRefreshTypeScript from "react-refresh-typescript";
import { buildCssLoader } from "./buildLoaders/buildCssLoader";
import { buildSvgLoader } from "./buildLoaders/buildSvgLoader";
import { buildBabelLoader } from "./buildLoaders/buildBabelLoader";

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff2|woff)$/i,
    type: "asset/resource",
    // use: [
    //   {
    //     loader: "file-loader",
    //   },
    // ],
  };

  const babelLoader = buildBabelLoader(isDev);

  const svgLoader = buildSvgLoader();

  const typescriptLoader = {
    test: /\.tsx?$/,
    loader: "ts-loader",
    exclude: /node_modules/,
    options: isDev
      ? {
          getCustomTransformers: () => ({
            before: [ReactRefreshTypeScript()],
          }),
        }
      : {},
  };

  const cssLoader = buildCssLoader(isDev);

  return [fileLoader, svgLoader, babelLoader, typescriptLoader, cssLoader];
}
