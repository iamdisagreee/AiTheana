import { classNames } from "shared/lib/classNames/classNames";
import cls from "./InfoPanel.module.scss";
import { memo, useCallback } from "react";
import Text, { ThemeText } from "shared/ui/Text/Text";
import { useTranslation } from "react-i18next";
import Button from "shared/ui/Button/Button";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "shared/config/routeConfig/routeConfig";

interface InfoPanelProps {
  className?: string;
}

export const InfoPanel = memo((props: InfoPanelProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const onMainPage = useCallback(() => {
    navigate(RoutePath.main);
  }, [navigate]);

  return (
    <div className={classNames(cls.InfoPanel, {}, [className])}>
      <Button onClick={onMainPage} className={cls.onMainBtn}>
        <Text
          text={t("На главную")}
          theme={ThemeText.SECONDARY}
          className={cls.onMainText}
        />
      </Button>
    </div>
  );
});
