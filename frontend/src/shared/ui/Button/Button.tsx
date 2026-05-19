import React, { ButtonHTMLAttributes, FC, memo, ReactNode } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Button.module.scss";

export enum ButtonTheme {
  CLEAR = "clear",
  CLEAR_INVERTED = "clearInverted",
  OUTLINE = "outline",
  OUTLINE_RED = "outline_red",
  BACKGROUND = "background",
  BACKGROUND_INVERTED = "backgroundInverted",
  BASE = "base",
}

export enum ButtonSize {
  "M" = "sizeM",
  "L" = "sizeL",
  "XL" = "sizeXL",
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
    size = ButtonSize.L,
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
