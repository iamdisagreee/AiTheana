import { classNames } from "shared/lib/classNames/classNames";
import { useTheme } from "app/providers/ThemeProvider";
import { AppRouter } from "app/providers/router";
import { Navbar } from "widgets/Navbar";
import { Sidebar } from "widgets/Sidebar";
import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInited, userActions } from "units/User";
import Loader from "shared/ui/Loader/Loader";

const App = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const _inited = useSelector(getUserInited);

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  return (
    <div className={classNames("app", {}, [theme])}>
      <Suspense fallback="">
        {/* <Navbar /> */}
        <div className="content-page">
          {/* <Sidebar /> */}
          {_inited && <AppRouter />}
        </div>
      </Suspense>
    </div>
  );
};

export default App;
