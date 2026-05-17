import React, { useCallback, useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ProfilePageHeader.module.scss";
import Button, { ButtonTheme } from "shared/ui/Button/Button";
import { useTranslation } from "react-i18next";
import Text from "shared/ui/Text/Text";
import { useSelector } from "react-redux";
import {
  getProfileFormData,
  getProfileReadonly,
  profileActions,
  updateProfileData,
} from "units/Profile";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { getUserAuthData } from "units/User";

interface ProfilePageHeaderProps {
  className?: string;
}

const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {
  const { t } = useTranslation();
  const authData = useSelector(getUserAuthData);
  const readonly = useSelector(getProfileReadonly);
  const profile = useSelector(getProfileFormData);
  const canEdit = authData?.id === profile?.id;
  const dispatch = useAppDispatch();

  const onChange = useCallback(() => {
    dispatch(profileActions.onChange());
  }, [dispatch]);

  const onCancel = useCallback(() => {
    dispatch(profileActions.onCancel());
  }, [dispatch]);

  const onUpdate = useCallback(() => {
    dispatch(updateProfileData(profile?.id));
  }, [dispatch, profile?.id]);

  return (
    <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
      <Text title={t("Профиль")} />
      {canEdit &&
        (readonly ? (
          <Button
            theme={ButtonTheme.OUTLINE}
            className={cls.button}
            onClick={onChange}
          >
            {t("Редактировать")}
          </Button>
        ) : (
          <div className={cls.buttons}>
            <Button theme={ButtonTheme.OUTLINE} onClick={onUpdate}>
              {t("Сохранить")}
            </Button>
            <Button theme={ButtonTheme.OUTLINE_RED} onClick={onCancel}>
              {t("Отменить")}
            </Button>
          </div>
        ))}
    </div>
  );
};

export default ProfilePageHeader;
