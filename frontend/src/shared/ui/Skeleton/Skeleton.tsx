import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Skeleton.module.scss";
import { CSSProperties, memo, useMemo } from "react";

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
}

export const Skeleton = memo((props: SkeletonProps) => {
  const {
    className,
    width = "100%",
    height = "100%",
    borderRadius = 0,
  } = props;
  const style = useMemo<CSSProperties>(() => {
    return {
      width,
      height,
      borderRadius,
    };
  }, [width, height, borderRadius]);
  return (
    <div
      className={classNames(cls.Skeleton, {}, [className])}
      style={style}
    ></div>
  );
});
