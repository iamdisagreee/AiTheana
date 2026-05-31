import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Icon.module.scss";
import { FC, memo, SVGProps } from "react";

export enum IconTheme {
  CLEAR = "clear",
  INVERTED_PRIMARY = "inverted_primary",
  SECONDARY = "secondary",
}

// export enum IconColorMode {
//   FILL = "fill",
//   STROKE = "stroke",
//   BOTH = "both",
// }

interface IconProps {
  className?: string;
  Svg: FC<SVGProps<SVGElement>>;
  theme?: IconTheme;
  // colorMode?: IconColorMode;
}

export const Icon = memo((props: IconProps) => {
  const {
    className,
    Svg,
    theme = IconTheme.CLEAR,
    // colorMode = IconColorMode.FILL,
  } = props;
  return (
    <Svg
      className={classNames(cls.Icon, {}, [
        className,
        cls[theme],
        // cls[colorMode],
      ])}
    />
  );
});
