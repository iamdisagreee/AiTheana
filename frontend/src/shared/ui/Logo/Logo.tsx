import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Logo.module.scss";
import { CSSProperties, memo, useMemo } from "react";
import { Icon, IconTheme } from "../Icon/Icon";
import LogoIcon from "shared/assets/icons/logo.svg";
import { APPLICATION_NAME } from "shared/const/const";
import Text, { FontWeightText, SizeText, ThemeText } from "../Text/Text";

export enum SizeLogo {
  "SMALL" = "small",
  "BIG" = "big",
}

interface LogoProps {
  className?: string;
  size?: SizeLogo;
}

export const Logo = memo((props: LogoProps) => {
  const { className, size = SizeLogo.SMALL } = props;

  // const style = useMemo<CSSProperties>(() => {
  //   return {
  //     width: width || 100,
  //     height: height || 100,
  //   };
  // }, [width, height]);

  return (
    <div className={classNames(cls.Logo, {}, [className])}>
      <Icon
        Svg={LogoIcon}
        theme={IconTheme.SECONDARY}
        className={cls.headerSvg}
      />
      {size === SizeLogo.BIG ? (
        <Text
          text={APPLICATION_NAME}
          theme={ThemeText.SECONDARY}
          size={SizeText.L}
          fontWeight={FontWeightText.MEDIUM}
        />
      ) : (
        <Text
          text={APPLICATION_NAME}
          theme={ThemeText.SECONDARY}
          size={SizeText.M}
          fontWeight={FontWeightText.MEDIUM}
        />
      )}
    </div>
  );
});
