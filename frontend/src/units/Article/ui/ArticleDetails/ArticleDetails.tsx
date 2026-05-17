import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleDetails.module.scss";
import { memo, useCallback, useEffect } from "react";
import { fetchArticleById } from "../../model/services/fetchArticleById/fetchArticleById";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import {
  getArticleData,
  getArticleError,
  getArticleIsLoading,
} from "../../model/selectors/getArticleSelectors";
import DynamicModuleLoader, {
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";
import Avatar from "shared/ui/Avatar/Avatar";
import Text, { SizeText } from "shared/ui/Text/Text";
import EyeIcon from "shared/assets/icons/eye.svg";
import Calendar from "shared/assets/icons/calendar.svg";
import { Icon } from "shared/ui/Icon/Icon";
import { ArticleBlockCodeComponent } from "../ArticleBlockCodeComponent/ArticleBlockCodeComponent";
import { ArticleBlock, ArticleBlockType } from "../../model/types/article";
import { ArticleBlockTextComponent } from "../ArticleBlockTextComponent/ArticleBlockTextComponent";
import { ArticleBlockImageComponent } from "../ArticleBlockImageComponent/ArticleBlockImageComponent";
import { articleDetailsReducer } from "../../model/slice/ArticleDetailsSlice";
import Button, { ButtonTheme } from "shared/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "shared/config/routeConfig/routeConfig";

interface ArticleDetailsProps {
  className?: string;
  id: string;
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo(({ className, id }: ArticleDetailsProps) => {
  const dispatch = useAppDispatch();
  const data = useSelector(getArticleData);
  const error = useSelector(getArticleError);
  const isLoading = useSelector(getArticleIsLoading);
  const { t } = useTranslation();

  useEffect(() => {
    if (__PROJECT__ != "storybook") {
      dispatch(fetchArticleById(id));
    }
  }, [dispatch, id]);

  const renderBlock = (block: ArticleBlock) => {
    switch (block.type) {
      case ArticleBlockType.TEXT:
        return (
          <ArticleBlockTextComponent
            className={cls.block}
            block={block}
            key={block.id}
          />
        );
      case ArticleBlockType.CODE:
        return (
          <ArticleBlockCodeComponent
            className={cls.block}
            block={block}
            key={block.id}
          />
        );
      case ArticleBlockType.IMAGE:
        return (
          <ArticleBlockImageComponent
            className={cls.block}
            block={block}
            key={block.id}
          />
        );
      default:
        return null;
    }
  };

  let article;
  if (isLoading || !data) {
    article = (
      <>
        <div className={cls.avatarWrapper}>
          <Skeleton
            width={200}
            height={200}
            borderRadius={"50%"}
            className={cls.avatar}
          />
        </div>
        <Skeleton width={"60%"} height={30} className={cls.title} />
        <Skeleton width={"45%"} height={30} className={cls.skeleton} />
        <Skeleton height={230} className={cls.skeleton} />
        <Skeleton height={230} className={cls.skeleton} />
      </>
    );
  } else if (error) {
    article = "Ошибка загрузки данных...";
  } else {
    article = (
      <>
        <div className={cls.avatarWrapper}>
          <Avatar src={data?.img} className={cls.avatar} size={200} />
        </div>
        <div className={cls.title}>
          <Text title={data?.title} text={data?.subtitle} size={SizeText.L} />
        </div>
        <div className={cls.views}>
          <Icon Icon={EyeIcon} />
          <Text text={data?.views.toString()} />
        </div>
        <div className={cls.calendar}>
          <Icon Icon={Calendar} />
          <Text text={data?.createdAt} />
        </div>
        <>{data?.blocks.map(renderBlock)}</>
      </>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(cls.ArticleDetails, {}, [className])}>
        {article}
      </div>
    </DynamicModuleLoader>
  );
});
