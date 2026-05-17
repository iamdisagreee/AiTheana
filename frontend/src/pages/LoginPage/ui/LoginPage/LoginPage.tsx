import { classNames } from "shared/lib/classNames/classNames";
import cls from "./LoginPage.module.scss";
import { memo } from "react";

interface LoginPageProps {
  className?: string;
}

const LoginPage = memo((props: LoginPageProps) => {
  const { className } = props;

  return (
    <div className={classNames(cls.LoginPage, {}, [className])}>LOGIN PAGE</div>
  );
});

export default LoginPage;
