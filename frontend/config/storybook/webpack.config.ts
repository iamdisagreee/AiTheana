import path from "path";
import { BuildEnv, BuildPaths } from "../build/types/config";
import webpack from "webpack";
import { buildCssLoader } from "../build/buildLoaders/buildCssLoader";
import { buildSvgLoader } from "../build/buildLoaders/buildSvgLoader";

export default ({ config }: { config: webpack.Configuration }) => {
  const paths: BuildPaths = {
    entry: "",
    build: "",
    html: "",
    src: path.resolve(__dirname, "..", "..", "src"),
  };

  config?.resolve?.modules?.push(paths.src);
  // config.resolve.extensions.push(".ts", ".tsx")

  config?.module?.rules?.push(buildCssLoader(true));

  const imageRule = config.module?.rules?.find((rule) => {
    const test = (rule as { test: RegExp }).test;
    if (!test) {
      return false;
    }
    return test.test(".svg");
  }) as { [key: string]: any };
  imageRule.exclude = /\.svg$/;
  config?.module?.rules?.push(buildSvgLoader());

  config?.plugins?.push(
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(true),
      __API__: JSON.stringify(""),
      __PROJECT__: JSON.stringify("storybook"),
    }),
  );

  return config;
};
