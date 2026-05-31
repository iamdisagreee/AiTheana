import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Textarea.module.scss";
import { memo, TextareaHTMLAttributes } from "react";

export enum TextareaTheme {
  CLEAR = "clear",
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  theme?: TextareaTheme;
  placeholder?: string;
  disabled?: boolean;
}

export const Textarea = memo((props: TextareaProps) => {
  const {
    className,
    theme = TextareaTheme.CLEAR,
    placeholder,
    disabled = false,
    ...otherProps
  } = props;

  return (
    <textarea
      className={classNames(cls.Textarea, {}, [className, cls[theme]])}
      placeholder={placeholder}
      disabled={disabled}
      {...otherProps}
    />
  );
});
