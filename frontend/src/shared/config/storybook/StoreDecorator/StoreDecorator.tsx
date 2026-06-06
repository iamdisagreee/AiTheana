import { ReducersMapObject } from "@reduxjs/toolkit";
import { Story } from "@storybook/react";
import { StateSchema, StoreProvider } from "app/providers/StoreProvider";
import { loginReducer } from "features/LoginByUsername";
import { BrowserRouter } from "react-router-dom";

export const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> =
  {
    login: loginReducer,
  };

export const StoreDecorator =
  (
    store: DeepPartial<StateSchema>,
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>,
  ) =>
  (StoryComponent: Story) => {
    return (
      <BrowserRouter>
        <StoreProvider
          initialState={store}
          asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
        >
          <StoryComponent />
        </StoreProvider>
      </BrowserRouter>
    );
  };
