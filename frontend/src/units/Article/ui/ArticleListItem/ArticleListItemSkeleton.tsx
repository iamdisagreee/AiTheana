import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleListItem.module.scss";
import { memo } from "react";
import { ArticleView } from "../../model/types/article";
import { Card } from "shared/ui/Card/Card";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";

interface ArticleListItemSkeletonProps {
  className?: string;
  view: ArticleView;
}

export const ArticleListItemSkeleton = memo(
  (props: ArticleListItemSkeletonProps) => {
    const { className, view } = props;

    if (view === ArticleView.LIST)
      return (
        <Card
          className={classNames(cls.ArticleListItem, {}, [
            className,
            cls[view],
          ])}
        >
          <div className={cls.header}>
            <Skeleton
              height={30}
              width={30}
              borderRadius={50}
              className={cls.avatar}
            />
            <Skeleton width={"20%"} height={16} className={cls.username} />
            <Skeleton width={"10%"} height={16} className={cls.date} />
          </div>
          <Skeleton width={"60%"} height={24} className={cls.title} />
          <Skeleton width={"30%"} height={16} className={cls.types} />
          <div className={cls.imageWrapper}>
            <Skeleton height={200} />
          </div>
          <div className={cls.footer}>
            <Skeleton width={"10%"} height={32} />
            <Skeleton width={"5%"} className={cls.views} />
          </div>
        </Card>
      );

    return (
      <Card
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      >
        <div className={cls.imageWrapper}>
          <Skeleton height={200} width={300} />
        </div>
        <div className={cls.infoWrapper}>
          <Skeleton height={16} width={"60%"} />
        </div>
        <Skeleton height={24} width={"70%"} />
      </Card>
    );
  },
);
