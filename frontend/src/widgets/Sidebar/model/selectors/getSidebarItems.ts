import { createSelector } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import { SidebarItemType } from "../types/sidebar";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import MainLink from "shared/assets/icons/main.svg";
import AboutLink from "shared/assets/icons/about.svg";
import ProfileLink from "shared/assets/icons/profile.svg";
import ArticleLink from "shared/assets/icons/article.svg";

export const getSidebarItems = createSelector(
  (state: StateSchema) => state.userSchema.user,
  (authData) => {
    const sidebarItemList: SidebarItemType[] = [
      {
        link: RoutePath.main,
        Icon: MainLink,
        name: "Главная",
      },
      {
        link: RoutePath.about,
        Icon: AboutLink,
        name: "О сайте",
      },
    ];

    if (authData) {
      sidebarItemList.push(
        {
          link: `${RoutePath.profile}${authData.id}`,
          Icon: ProfileLink,
          name: "Профиль",
          authOnly: true,
        },
        {
          link: RoutePath.articles,
          Icon: ArticleLink,
          name: "Статьи",
          authOnly: true,
        },
      );
    }

    return sidebarItemList;
  },
);
