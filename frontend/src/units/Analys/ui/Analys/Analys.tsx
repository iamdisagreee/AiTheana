import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Analys.module.scss";
import { memo } from "react";
import { AnalysData } from "../../model/analys";
import Text, { SizeText, ThemeText } from "shared/ui/Text/Text";

interface AnalysProps {
  className?: string;
  data: AnalysData;
}

export const Analys = memo((props: AnalysProps) => {
  const { className, data } = props;
  const { content } = data;

  return (
    <Text
      text={content}
      size={SizeText.M}
      theme={ThemeText.PRIMARY}
      className={classNames(cls.MessageAIText, {}, [className])}
    />
  );
});
