import cls from "./AuthLayout.module.scss";
import { memo, ReactNode } from "react";
import { Page } from "widgets/Page/Page";
import backgroundImage from "shared/assets/png/background-login.png";

interface AuthLayoutProps {
  className?: string;
  children: ReactNode;
}

export const AuthLayout = memo((props: AuthLayoutProps) => {
  const { children } = props;

  return (
    <Page
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
      className={cls.AuthLayout}
    >
      <div className={cls.loginForm}>{children}</div>
    </Page>
  );
});
