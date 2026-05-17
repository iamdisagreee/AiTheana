import { memo, Suspense, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import {
  AppRouterProps,
  routeConfig,
} from "shared/config/routeConfig/routeConfig";
import { PageLoader } from "widgets/PageLoader";
import { RequireAuth } from "./RequireAuth";

const AppRouter = () => {
  const wrapperRouter = useCallback((route: AppRouterProps) => {
    const { path, element, authOnly } = route;

    const showElement = (
      <Suspense fallback={<PageLoader />}>{element}</Suspense>
    );

    return (
      <Route
        key={path}
        path={path}
        element={
          authOnly ? <RequireAuth>{showElement}</RequireAuth> : showElement
        }
      />
    );
  }, []);

  return (
    <Suspense
      fallback={
        <div className="page-wrapper">
          <PageLoader />
        </div>
      }
    >
      <Routes>{Object.values(routeConfig).map(wrapperRouter)}</Routes>
    </Suspense>
  );
};

export default memo(AppRouter);
