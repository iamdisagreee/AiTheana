import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleEditPage.module.scss";
import { useParams } from "react-router-dom";
import { Page } from "widgets/Page/Page";

interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage = (props: ArticleEditPageProps) => {
  const { className } = props;
  const { id } = useParams();
  const isEdit = Boolean(id);

  return <Page>{isEdit ? "Edit article" : "Create Article"} </Page>;
};

export default ArticleEditPage;
