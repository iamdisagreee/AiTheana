import { Page } from "widgets/Page/Page";

import React from "react";
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

const MainPage = () => {
  const { t } = useTranslation();
  return (
    <Page className={cls.MainPage}>
      <Image src={LeftSide} className={cls.leftSide} />
      <Image src={RightSide} className={cls.rightSide} />
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
          />
          <Text
            text={t("понимания себя")}
            theme={ThemeText.SECONDARY}
            fontWeight={FontWeightText.REGULAR}
            size={SizeText["6XL"]}
          />
        </div>
        <Text
          text={t("Загрузи чат и получи первый инсайт о себе")}
          size={SizeText.M}
          theme={ThemeText.PRIMARY}
          fontWeight={FontWeightText.MEDIUM}
          className={cls.subtitle}
        />
        <Button theme={ButtonTheme.OUTLINE_INVERTED} className={cls.forwardBtn}>
          <Text
            text={t("Вперед")}
            size={SizeText.M}
            theme={ThemeText.SECONDARY}
            fontWeight={FontWeightText.MEDIUM}
            align={AlignText.CENTER}
          />
        </Button>
      </div>
    </Page>
  );
};

export default MainPage;
