import { render } from "@testing-library/react";
import { StateSchema, StoreProvider } from "app/providers/StoreProvider";
import { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import i18n from "shared/config/i18n/i18nForTest";

interface CompononentRenderOptions {
  initialRoute?: string;
  initialState?: DeepPartial<StateSchema>;
}

export const componentRender = (
  component: ReactNode,
  options: CompononentRenderOptions = {},
) => {
  const { initialRoute = "/", initialState } = options;

  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <StoreProvider initialState={initialState}>
        <I18nextProvider i18n={i18n}>{component}</I18nextProvider>
      </StoreProvider>
    </MemoryRouter>,
  );
};
