import React, { CSSProperties, memo, useMemo } from "react";
import cls from "./Avatar.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
interface AvatarProps {
  src?: string;
  size?: number;
  alt?: string;
  className?: string;
}

const Avatar = (props: AvatarProps) => {
  const { src, size, alt, className } = props;
  const style = useMemo<CSSProperties>(() => {
    return {
      width: size || 100,
      height: size || 100,
    };
  }, [size]);
  return (
    <img
      style={style}
      src={src}
      alt={alt}
      className={classNames(cls.Avatar, {}, [className])}
    />
  );
};

export default memo(Avatar);
