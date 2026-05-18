import React, { ChangeEvent, useMemo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Select.module.scss";

export interface SelectOption<T> {
  value: T;
  content: string;
}

interface SelectProps<T extends string> {
  className?: string;
  options?: SelectOption<T>[];
  value?: T;
  onChange?: (value: T) => void;
  placeholder?: string;
  readonly?: boolean;
}

const Select = <T extends string>(props: SelectProps<T>) => {
  const { className, options, value, onChange, placeholder, readonly } = props;

  const insertOptions = useMemo(() => {
    return options?.map((opt) => (
      <option value={opt.value} key={opt.value} className={cls.option}>
        {opt.content}
      </option>
    ));
  }, [options]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value as T);
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

export default Select;
