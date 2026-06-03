import { Page } from "widgets/Page/Page";

import React, { useCallback } from "react";
import cls from "./MainPage.module.scss";
import { Image } from "shared/ui/Image/Image";
import LeftSide from "shared/assets/png/background-main/left-side.png";
import RightSide from "shared/assets/png/background-main/right-side.png";
import Text, {
  AlignText,
  FontWeightText,
  SizeText,
  ThemeText,
} from "shared/ui/Text/Text";
import { useTranslation } from "react-i18next";
import { APPLICATION_NAME } from "shared/const/const";
import Button, { ButtonTheme } from "shared/ui/Button/Button";
import { Navbar } from "widgets/Navbar";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "shared/config/routeConfig/routeConfig";

const MainPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const onClickLogin = useCallback(() => navigate(RoutePath.chats), [navigate]);

  return (
    <Page className={cls.MainPage}>
      <div className={cls.MainPageWrapper}>
        <Image src={LeftSide} className={cls.leftSide} />
        <Image src={RightSide} className={cls.rightSide} />
        <Navbar />
        <div className={cls.content}>
          <Text
            text={APPLICATION_NAME}
            theme={ThemeText.SECONDARY}
            size={SizeText["11XL"]}
            fontWeight={FontWeightText.MEDIUM}
            className={cls.title}
          />
          <div className={cls.info}>
            <Text
              text={t("Твое безопасное пространство для")}
              theme={ThemeText.PRIMARY}
              fontWeight={FontWeightText.REGULAR}
              size={SizeText["6XL"]}
              align={AlignText.CENTER}
            />
            <Text
              text={t("понимания себя")}
              theme={ThemeText.SECONDARY}
              fontWeight={FontWeightText.REGULAR}
              size={SizeText["6XL"]}
              align={AlignText.CENTER}
              className={cls.infoEnd}
            />
          </div>
          <Text
            text={t("Загрузи чат и получи первый инсайд о себе")}
            size={SizeText.M}
            theme={ThemeText.PRIMARY}
            fontWeight={FontWeightText.MEDIUM}
            className={cls.subtitle}
          />
          <Button
            theme={ButtonTheme.OUTLINE_INVERTED}
            onClick={onClickLogin}
            className={cls.forwardBtn}
          >
            <Text
              text={t("Вперед")}
              size={SizeText.M}
              theme={ThemeText.SECONDARY}
              fontWeight={FontWeightText.MEDIUM}
              align={AlignText.CENTER}
            />
          </Button>
        </div>
      </div>
    </Page>
  );
};

export default MainPage;
