import { classNames } from "shared/lib/classNames/classNames";
import cls from "./AuthLayout.module.scss";
import { memo, ReactNode, useEffect } from "react";
import { Page } from "widgets/Page/Page";
import backgroundImage from "shared/assets/png/background-login.png";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserAuthData } from "units/User";

interface AuthLayoutProps {
  className?: string;
  children: ReactNode;
}

export const AuthLayout = memo((props: AuthLayoutProps) => {
  const { className, children } = props;

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
