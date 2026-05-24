import { AboutPage } from "pages/AboutPage";
import { ArticleDetailsPage } from "pages/ArticleDetailsPage";
import { ArticlesPage } from "pages/ArticlesPage";
import { ChatsPage } from "pages/ChatsPage";
import { ConfirmCodePage } from "pages/ConfirmCodePage";
import { LoginPage } from "pages/LoginPage";
import { MainPage } from "pages/MainPage";
import { NotFoundPage } from "pages/NotFoundPage";
import { ProfilePage } from "pages/ProfilePage";
import { RegistrationPage } from "pages/RegistrationPage";
import { RouteProps } from "react-router-dom";

export type AppRouterProps = RouteProps & {
  authOnly?: boolean;
  children?: AppRouterProps[];
};

export enum AppRoutes {
  MAIN = "main",
  ABOUT = "about",
  PROFILE = "profile",
  ARTICLES = "articles",
  ARTICLES_DETAILS = "articles_details",
  LOGIN = "login",
  REGISTRATION = "registration",
  // AUTH_LAYOUT = "auth_layout",
  CONFIRM_CODE = "confirm_code",
  CHATS = "chats",
  //
  NOT_FOUND = "not_found",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.ABOUT]: "/about",
  [AppRoutes.PROFILE]: "/profile/", // + :id
  [AppRoutes.ARTICLES]: "/articles",
  [AppRoutes.ARTICLES_DETAILS]: "/articles/", // + :id
  [AppRoutes.LOGIN]: "/login",
  [AppRoutes.REGISTRATION]: "/registration",
  [AppRoutes.CONFIRM_CODE]: "/confirm-code",
  [AppRoutes.CHATS]: "/chats",
  [AppRoutes.NOT_FOUND]: "*",
};

export const routeConfig: Record<AppRoutes, AppRouterProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />,
  },
  [AppRoutes.ABOUT]: {
    path: RoutePath.about,
    element: <AboutPage />,
  },
  [AppRoutes.PROFILE]: {
    path: `${RoutePath.profile}:id`,
    element: <ProfilePage />,
    authOnly: true,
  },
  [AppRoutes.ARTICLES]: {
    path: RoutePath.articles,
    element: <ArticlesPage />,
    authOnly: true,
  },
  [AppRoutes.ARTICLES_DETAILS]: {
    path: `${RoutePath.articles_details}:id`,
    element: <ArticleDetailsPage />,
    authOnly: true,
  },
  [AppRoutes.LOGIN]: {
    path: RoutePath.login,
    element: <LoginPage />,
  },
  [AppRoutes.REGISTRATION]: {
    path: RoutePath.registration,
    element: <RegistrationPage />,
  },
  [AppRoutes.CONFIRM_CODE]: {
    path: RoutePath.confirm_code,
    element: <ConfirmCodePage />,
  },
  [AppRoutes.CHATS]: {
    path: RoutePath.chats,
    element: <ChatsPage />,
  },
  // [AppRoutes.AUTH_LAYOUT]: {
  //   element: <AuthLayout />,
  //   children: [
  //     {
  //       path: RoutePath.login,
  //       element: <LoginPage />,
  //     },
  //   ],
  // },

  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
  },
};
