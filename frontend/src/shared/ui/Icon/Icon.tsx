import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Icon.module.scss";
import { FC, memo, SVGProps } from "react";

interface IconProps {
  className?: string;
  Icon: FC<SVGProps<SVGElement>>;
}

export const Icon = memo(({ className, Icon }: IconProps) => {
  return <Icon className={classNames(cls.Icon, {}, [className])} />;
});
