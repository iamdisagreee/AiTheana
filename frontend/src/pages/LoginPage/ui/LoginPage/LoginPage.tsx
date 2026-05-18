import { classNames } from "shared/lib/classNames/classNames";
import cls from "./LoginPage.module.scss";
import { memo } from "react";
import { Page } from "widgets/Page/Page";
import backgroundImage from "shared/assets/png/background-login.png";

interface LoginPageProps {
  className?: string;
}

const LoginPage = memo((props: LoginPageProps) => {
  const { className } = props;

  return (
    <Page
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className={classNames(cls.LoginPage, {}, [className])}>
        LOGIN PAGE
      </div>
    </Page>
  );
});

export default LoginPage;
