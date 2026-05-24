import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Icon.module.scss";
import { FC, memo, SVGProps } from "react";

export enum IconTheme {
  CLEAR = "clear",
  SECONDARY = "secondary",
}

interface IconProps {
  className?: string;
  Svg: FC<SVGProps<SVGElement>>;
  theme?: IconTheme;
}

export const Icon = memo((props: IconProps) => {
  const { className, Svg, theme = IconTheme.CLEAR } = props;
  return <Svg className={classNames(cls.Icon, {}, [className, cls[theme]])} />;
});
