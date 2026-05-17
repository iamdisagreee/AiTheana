import React, { ChangeEvent, memo, useMemo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Select.module.scss";
import { Currency } from "units/Currency";

interface SelectOption {
  value: string;
  content: string;
}

interface SelectProps {
  className?: string;
  options?: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  readonly?: boolean;
}

const Select = (props: SelectProps) => {
  const { className, options, value, onChange, placeholder, readonly } = props;

  const insertOptions = useMemo(() => {
    return options?.map((opt) => (
      <option value={opt.value} key={opt.value}>
        {opt.content}
      </option>
    ));
  }, [options]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value as Currency);
  };

  return (
    <div className={classNames(cls.wrapper, {}, [className])}>
      {placeholder && <span>{`${placeholder}>`}</span>}
      <select
        value={value}
        onChange={handleChange}
        disabled={readonly}
        className={cls.select}
      >
        {insertOptions}
      </select>
    </div>
  );
};

export default memo(Select);
