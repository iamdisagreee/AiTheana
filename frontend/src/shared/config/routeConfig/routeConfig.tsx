import { ChatDetailsPage } from "pages/ChatDetailsPage";
import { ChatsPage } from "pages/ChatsPage";
import { ConfirmCodePage } from "pages/ConfirmCodePage";
import { LoginPage } from "pages/LoginPage";
import { MainPage } from "pages/MainPage";
import { NotFoundPage } from "pages/NotFoundPage";
import { RegistrationPage } from "pages/RegistrationPage";
import { RouteProps } from "react-router-dom";

export type AppRouterProps = RouteProps & {
  authOnly?: boolean;
  children?: AppRouterProps[];
};

export enum AppRoutes {
  MAIN = "main",
  LOGIN = "login",
  REGISTRATION = "registration",
  CONFIRM_CODE = "confirm_code",
  CHATS = "chats",
  CHAT_DETAILS = "chat_details",
  //
  NOT_FOUND = "not_found",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.LOGIN]: "/login",
  [AppRoutes.REGISTRATION]: "/registration",
  [AppRoutes.CONFIRM_CODE]: "/confirm-code",
  [AppRoutes.CHATS]: "/chats",
  [AppRoutes.CHAT_DETAILS]: "/chats/", // + :id
  [AppRoutes.NOT_FOUND]: "*",
};

export const routeConfig: Record<AppRoutes, AppRouterProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />,
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
  [AppRoutes.CHAT_DETAILS]: {
    path: `${RoutePath.chat_details}:id`,
    element: <ChatDetailsPage />,
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
