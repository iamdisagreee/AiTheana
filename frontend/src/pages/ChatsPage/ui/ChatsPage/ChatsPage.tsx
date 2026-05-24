import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ChatsPage.module.scss";
import { memo } from "react";
import LogoIcon from "shared/assets/icons/logo.svg";
import { Icon } from "shared/ui/Icon/Icon";
import Text, { FontWeightText, SizeText, ThemeText } from "shared/ui/Text/Text";
import { Sidebar } from "widgets/Sidebar";

interface ChatsPageProps {
  className?: string;
}

const ChatsPage = memo((props: ChatsPageProps) => {
  const { className } = props;

  return (
    <div className={classNames(cls.ChatsPage, {}, [className])}>
      <Sidebar />
    </div>
  );
});

export default ChatsPage;
