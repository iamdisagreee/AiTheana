import React, { useCallback } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import Select from "shared/ui/Select/Select";
import { Country } from "../model/types/country";

interface CountrySelectProps {
  className?: string;
  value?: string;
  onChange?: (value: Country) => void;
  placeholder?: string;
  readonly?: boolean;
}

const options = [
  { value: Country.Armenia, content: Country.Armenia },
  { value: Country.Belarus, content: Country.Belarus },
  { value: Country.Kazakhstan, content: Country.Kazakhstan },
  { value: Country.Russia, content: Country.Russia },
  { value: Country.Ukraine, content: Country.Ukraine },
];

const CurrencySelect = (props: CountrySelectProps) => {
  const { className, value, onChange, placeholder, readonly } = props;

  const handleChange = useCallback(
    (value: string) => {
      onChange?.(value as Country);
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
