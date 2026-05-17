import { classNames } from "shared/lib/classNames/classNames";
import cls from "./AddCommentForm.module.scss";
import { memo, useCallback } from "react";
import Input from "shared/ui/Input/Input";
import { useTranslation } from "react-i18next";
import Button, { ButtonTheme } from "shared/ui/Button/Button";
import DynamicModuleLoader, {
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {
  addCommentForArticleActions,
  addCommentForArticleReducer,
} from "../../model/slices/addCommentForArticleSlice";
import { useSelector } from "react-redux";
import {
  getAddCommentForArticleIsLoading,
  getAddCommentForArticleText,
} from "features/AddCommentForm/model/selectors/getAddCommentForArticleSelectors";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";

export interface AddCommentFormProps {
  className?: string;
  onSendComment: () => void;
}

const reducers: ReducersList = {
  addCommentForArticle: addCommentForArticleReducer,
};

const AddCommentForm = memo((props: AddCommentFormProps) => {
  const { t } = useTranslation();
  const { className, onSendComment } = props;
  const dispatch = useAppDispatch();
  const text = useSelector(getAddCommentForArticleText);
  // const isLoading = useSelector(getAddCommentForArticleIsLoading);

  const onCommentTextChange = useCallback(
    (value: string) => {
      dispatch(addCommentForArticleActions.setText(value));
    },
    [dispatch],
  );

  const onHandleClick = useCallback(() => {
    onSendComment();
    onCommentTextChange("");
  }, [onSendComment, onCommentTextChange]);

  // if (isLoading) {
  //   return <Skeleton height={70} className={classNames("", {}, [className])} />;
  // }

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(cls.AddCommentForm, {}, [className])}>
        <Input
          placeholder={t("Введите текст комментария")}
          className={cls.input}
          onChange={onCommentTextChange}
          value={text}
        />
        <Button onClick={onHandleClick} theme={ButtonTheme.OUTLINE}>
          {t("Отправить")}
        </Button>
      </div>
    </DynamicModuleLoader>
  );
});

export default AddCommentForm;
