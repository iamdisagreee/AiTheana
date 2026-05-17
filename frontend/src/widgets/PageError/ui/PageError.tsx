import React, { useEffect, useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./PageError.module.scss";
import Button from "shared/ui/Button/Button";

interface PageErrorProps {
  className?: string;
}

const PageError = ({ className }: PageErrorProps) => {
  const onReload = () => {
    location.reload();
  };

  return (
    <div className={classNames(cls.PageError, {}, [className])}>
      <h3>Произошла непредвиденная ошибка!</h3>
      <Button onClick={onReload}>Попробовать еще раз</Button>
    </div>
  );
};

export default PageError;
