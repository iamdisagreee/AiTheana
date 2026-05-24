import React, {
  useState,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  memo,
} from "react";
import cls from "./CodeInput.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import { SizeText, ThemeText } from "../Text/Text";
import Text from "../Text/Text";

interface CodeInputProps {
  className?: string;
  maxLength?: number;
  code: string;
  setCode: (value: string) => void;
  onComplete: (entereDcode: number) => void;
  disabled?: boolean;
}

export const CodeInput = memo((props: CodeInputProps) => {
  const {
    className,
    maxLength = 6,
    code,
    setCode,
    onComplete,
    disabled = false,
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > maxLength) {
      value = value.slice(0, maxLength);
    }
    setCode(value);

    if (value.length === maxLength) {
      onComplete?.(Number(value));
    }
  };

  const focusInput = () => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  };
  return (
    <div
      className={classNames(
        cls.container,
        {
          [cls.disabled]: disabled,
        },
        [className],
      )}
      onClick={focusInput}
    >
      <div className={cls.cells}>
        {Array.from({ length: maxLength }).map((_, idx) => {
          const value = code[idx];
          const isActive = idx == code.length;
          return (
            <div
              key={idx}
              className={classNames(cls.cell, { [cls.active]: isActive }, [])}
            >
              {value ? (
                <Text
                  text={value}
                  size={SizeText["11XL"]}
                  theme={ThemeText.PRIMARY}
                />
              ) : (
                <span className={cls.dot} />
              )}
            </div>
          );
        })}
      </div>
      <input
        ref={inputRef}
        value={code}
        onChange={handleChange}
        type="text"
        inputMode="numeric"
        pattern="\d*"
        maxLength={maxLength}
        className={cls.hiddenInput}
        autoFocus
      />
    </div>
  );
});
