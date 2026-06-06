import { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Loader.module.scss";

interface LoaderProps {
  className?: string;
}

const Loader = memo(({ className }: LoaderProps) => {
  return <span className={classNames(cls.Loader, {}, [className])}></span>;
});

export default Loader;
