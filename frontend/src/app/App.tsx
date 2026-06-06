import { classNames } from "shared/lib/classNames/classNames";
import { useTheme } from "app/providers/ThemeProvider";
import { AppRouter } from "app/providers/router";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "units/User";

const App = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  return (
    <div className={classNames("app", {}, [theme])}>
      <Suspense fallback="">
        {/* <Navbar /> */}
        <div className="content-page">
          {/* <Sidebar /> */}
          {<AppRouter />}
        </div>
      </Suspense>
    </div>
  );
};

export default App;
