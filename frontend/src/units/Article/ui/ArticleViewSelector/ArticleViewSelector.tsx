import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleViewSelector.module.scss";
import { memo } from "react";
import { ArticleView } from "../../model/types/article";
import TileSvg from "shared/assets/icons/tile.svg";
import ListSvg from "shared/assets/icons/list.svg";
import Button, { ButtonTheme } from "shared/ui/Button/Button";
import { Icon } from "shared/ui/Icon/Icon";

interface ArticleViewSelectorProps {
  className?: string;
  view?: ArticleView;
  onViewClick?: (view: ArticleView) => void;
}

const viewIcons = [
  {
    icon: TileSvg,
    view: ArticleView.TILE,
  },
  {
    icon: ListSvg,
    view: ArticleView.LIST,
  },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
  const { className, view = ArticleView.TILE, onViewClick } = props;

  const onHandleClick = (view: ArticleView) => () => {
    onViewClick?.(view);
  };

  return (
    <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
      {viewIcons.map((iconView) => (
        <Button
          key={iconView.view}
          onClick={onHandleClick(iconView.view)}
          theme={ButtonTheme.CLEAR}
        >
          <Icon
            Icon={iconView.icon}
            className={classNames(
              "",
              { [cls.notSelected]: iconView.view !== view },
              [],
            )}
          />
        </Button>
      ))}
    </div>
  );
});
