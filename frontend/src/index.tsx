import React from "react";
import { render } from "react-dom";
import App from "app/App";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { ThemeProvider } from "app/providers/ThemeProvider";
import "shared/config/i18n/i18n";
import { ErrorBoundary } from "app/providers/ErrorBoundary";
import "app/styles/index.scss";
import { StoreProvider } from "app/providers/StoreProvider";

render(
  <HashRouter>
    <StoreProvider>
      <ErrorBoundary>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ErrorBoundary>
    </StoreProvider>
  </HashRouter>,
  document.getElementById("root"),
);
