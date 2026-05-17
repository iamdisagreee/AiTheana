import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleDetailsPageHeader.module.scss";
import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import Button, { ButtonTheme } from "shared/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getArticleIsEdit } from "../../model/selectors/articles";
import { getArticleData } from "units/Article";

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader = memo(
  (props: ArticleDetailsPageHeaderProps) => {
    const { className } = props;
    const article = useSelector(getArticleData);
    const isEdit = useSelector(getArticleIsEdit);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const toArticles = useCallback(
      () => navigate(RoutePath.articles),
      [navigate],
    );

    const toEditArticle = useCallback(() => {
      navigate(`${RoutePath.articles_details}${article?.id}/edit`);
    }, [navigate, article?.id]);

    return (
      <div
        className={classNames(cls.ArticleDetailsPageHeader, {}, [className])}
      >
        <Button theme={ButtonTheme.OUTLINE} onClick={toArticles}>
          {t("Назад")}
        </Button>
        {isEdit && (
          <Button theme={ButtonTheme.OUTLINE} onClick={toEditArticle}>
            {t("Редактировать")}
          </Button>
        )}
      </div>
    );
  },
);
