import { classNames } from "shared/lib/classNames/classNames";
import cls from "./CommentList.module.scss";
import { memo } from "react";
import { Comment } from "../../model/types/comment";
import { useTranslation } from "react-i18next";
import Text from "shared/ui/Text/Text";
import { CommentCard } from "../CommentCard/CommentCard";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";

interface CommentListProps {
  className?: string;
  comments: Comment[];
  isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
  const { className, comments, isLoading } = props;
  const { t } = useTranslation();

  const renderComment = (comment: Comment) => {
    return <CommentCard comment={comment} key={comment.id} />;
  };

  if (isLoading) {
    return (
      <>
        <Skeleton height={50} className={cls.comment} />
        <Skeleton height={50} className={cls.comment} />
        <Skeleton height={50} className={cls.comment} />
      </>
    );
  }

  return (
    <div className={classNames(cls.CommentList, {}, [className])}>
      {comments.length || isLoading ? (
        <>{comments.map(renderComment)}</>
      ) : (
        <Text text={t("Комментарии не найдены")} />
      )}
    </div>
  );
});
