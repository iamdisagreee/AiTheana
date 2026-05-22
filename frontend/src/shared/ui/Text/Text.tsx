import React, { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Text.module.scss";

export enum ThemeText {
  PRIMARY = "primary",
  INVERTED_PRIMARY = "inverted_primary",
  ERROR = "error",
}

export enum AlignText {
  RIGHT = "right",
  LEFT = "left",
  CENTER = "center",
}

export enum SizeText {
  S = "size_s",
  M = "size_m",
  L = "size_l",
  XL = "size_xl",
  "2XL" = "size_2xl",
  "3XL" = "size_3xl",
  "4XL" = "size_4xl",
}

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: ThemeText;
  align?: AlignText;
  size?: SizeText;
}

const Text = memo((props: TextProps) => {
  const {
    className,
    title,
    text,
    theme = ThemeText.PRIMARY,
    align = AlignText.LEFT,
    size = SizeText.M,
  } = props;

  return (
    <div
      className={classNames(cls.Text, {}, [
        className,
        cls[theme],
        cls[align],
        cls[size],
      ])}
    >
      {title && <p className={cls.title}>{title}</p>}
      {text && <p className={cls.text}>{text}</p>}
    </div>
  );
});

export default Text;
