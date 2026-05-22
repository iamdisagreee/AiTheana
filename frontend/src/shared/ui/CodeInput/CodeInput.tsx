import React, { useState, useRef, ChangeEvent, KeyboardEvent } from "react";
import clsx from "clsx";
import styles from "./CodeInput.module.scss";

interface CodeInputProps {
  maxLength?: number;
  onComplete?: (code: string) => void;
  disabled?: boolean;
}

const CodeInput: React.FC<CodeInputProps> = ({
  maxLength = 6,
  onComplete,
  disabled = false,
}) => {
  const [code, setCode] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    let value = e.target.value.replace(/\D/g, "");

    if (value.length > maxLength) {
      value = value.slice(0, maxLength);
    }

    setCode(value);

    if (value.length === maxLength) {
      onComplete?.(value);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.key === "Backspace") {
      setCode((prev) => prev.slice(0, -1));
    }
  };

  const focusInput = () => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  };

  return (
    <div
      className={clsx(styles.container, {
        [styles.disabled]: disabled,
      })}
      onClick={focusInput}
    >
      <div className={styles.cells}>
        {Array.from({ length: maxLength }).map((_, idx) => {
          const isActive = idx === code.length;
          const value = code[idx];

          return (
            <div
              key={idx}
              className={clsx(styles.cell, {
                [styles.active]: isActive,
                [styles.filled]: !!value,
              })}
            >
              {value ? (
                <span className={styles.number}>{value}</span>
              ) : (
                <span className={styles.dot} />
              )}
            </div>
          );
        })}
      </div>

      <input
        ref={inputRef}
        value={code}
        onChange={handleChange}
        // onKeyDown={handleKeyDown}
        type="text"
        inputMode="numeric"
        pattern="\d*"
        maxLength={maxLength}
        className={styles.hiddenInput}
        autoFocus
      />
    </div>
  );
};

export default CodeInput;
