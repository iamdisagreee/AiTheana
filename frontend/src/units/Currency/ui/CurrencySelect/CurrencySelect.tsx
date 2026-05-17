import React, { ChangeEvent, useCallback, useMemo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./CurrencySelect.module.scss";
import { Currency } from "../../model/types/currency";
import Select from "shared/ui/Select/Select";

interface CurrencySelectProps {
  className?: string;
  value?: string;
  onChange?: (value: Currency) => void;
  placeholder?: string;
  readonly?: boolean;
}

const options = [
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.USD, content: Currency.USD },
];

const CurrencySelect = (props: CurrencySelectProps) => {
  const { className, value, onChange, placeholder, readonly } = props;

  const handleChange = useCallback(
    (value: string) => {
      onChange?.(value as Currency);
    },
    [onChange],
  );

  return (
    <Select
      className={classNames(className, {}, [])}
      options={options}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      readonly={readonly}
    />
  );
};

export default CurrencySelect;
