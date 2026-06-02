import React, { ButtonHTMLAttributes, FC, memo, ReactNode } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Button.module.scss";

export enum ButtonTheme {
  OUTLINE = "outline",
  OUTLINE_RED = "outline_red",
  BACKGROUND = "background",
  //new
  CLEAR = "clear",
  CLEAR_INVERTED = "clear_inverted",
  CLEAR_SECONDARY = "clear_secondary",
  BACKGROUND_INVERTED = "background_inverted",
  BACKGROUND_SECONDARY = "background_secondary",
  OUTLINE_INVERTED = "outline_inverted",
}

export enum ButtonSize {
  "M" = "size_m",
  "L" = "size_l",
  "XL" = "size_xl",
  "2XL" = "size_2xl",
  "3XL" = "size_3xl",
  "4XL" = "size_4xl",
}

export enum ButtonFontWeight {
  "REGULAR" = "regular",
  "MEDIUM" = "medium",
  "SEMIBOLD" = "semibold",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
  square?: boolean;
  size?: ButtonSize;
  fontWeight?: ButtonFontWeight;
  disabled?: boolean;
  children: ReactNode;
}

const Button = memo((props: ButtonProps) => {
  const {
    className,
    children,
    theme = ButtonTheme.CLEAR,
    square,
    size = ButtonSize.M,
    fontWeight = ButtonFontWeight.REGULAR,
    disabled,
    ...otherProps
  } = props;

  return (
    <button
      className={classNames(
        cls.Button,
        { [cls.square]: square, [cls.disabled]: disabled },
        [className, cls[theme], cls[size], cls[fontWeight]],
      )}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
});

export default Button;
