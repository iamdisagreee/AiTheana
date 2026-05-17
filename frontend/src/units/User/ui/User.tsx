import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./User.module.scss";

interface UserProps {
  className?: string;
}

const User = ({ className }: UserProps) => {
  return <div className={classNames(cls.User, {}, [className])}></div>;
};

export default User;
