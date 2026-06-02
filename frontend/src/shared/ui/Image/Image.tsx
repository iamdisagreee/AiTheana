import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Image.module.scss";
import { ImgHTMLAttributes, memo, SVGProps } from "react";
import { useTranslation } from "react-i18next";

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  src: string;
  alt?: string;
}

export const Image = memo((props: ImageProps) => {
  const { t } = useTranslation();
  const { className, src, alt = t("Не найдено"), ...otherProps } = props;

  return (
    <img
      src={src}
      alt={alt}
      className={classNames(cls.Image, {}, [className])}
      {...otherProps}
    />
  );
});
