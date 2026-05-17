import React, {
  FC,
  InputHTMLAttributes,
  memo,
  MutableRefObject,
  useEffect,
  useRef,
} from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Input.module.scss";

type InputPropsExtends = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onFocus" | "onChange" | "readonly"
>;

interface InputProps extends InputPropsExtends {
  className?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  autofocus?: boolean;
  type?: string;
  placeholder?: string;
  readonly?: boolean;
}

const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    autofocus,
    onChange,
    type = "text",
    placeholder,
    readonly,
    ...otherProps
  } = props;

  const ref = useRef() as MutableRefObject<HTMLInputElement>;
  useEffect(() => {
    if (autofocus) {
      ref.current?.focus();
    }
  }, [autofocus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={cls.inputWrapper}>
      {placeholder && (
        <span className={cls.placeholder}>{placeholder + ">"}</span>
      )}
      <input
        ref={ref}
        // autofocus={autofocus}
        value={value || ""}
        autoFocus={autofocus}
        onChange={handleChange}
        type={type}
        readOnly={readonly}
        className={classNames(cls.Input, {}, [className])}
        {...otherProps}
      ></input>
    </div>
  );
});

export default Input;
