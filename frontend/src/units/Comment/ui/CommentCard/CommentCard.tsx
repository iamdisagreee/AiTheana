import { classNames } from "shared/lib/classNames/classNames";
import cls from "./CommentCard.module.scss";
import { memo } from "react";
import { Comment } from "../../model/types/comment";
import Avatar from "shared/ui/Avatar/Avatar";
import Text from "shared/ui/Text/Text";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";
import AppLink from "shared/ui/AppLink/AppLink";
import { RoutePath } from "shared/config/routeConfig/routeConfig";

interface CommentCardProps {
  className?: string;
  comment?: Comment;
}

export const CommentCard = memo(({ className, comment }: CommentCardProps) => {
  return (
    <div className={classNames(cls.CommentCard, {}, [className])}>
      <AppLink
        className={cls.header}
        to={`${RoutePath.profile}${comment?.user.id}`}
      >
        {/* {comment?.user?.avatar && (
          <Avatar src={comment.user.avatar} size={30} />
        )} */}
        <Text text={comment?.user.username} />
      </AppLink>

      <Text text={comment?.text} />
    </div>
  );
});
