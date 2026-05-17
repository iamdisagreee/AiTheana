import { Story } from "@storybook/react";
import { StateSchema, StoreProvider } from "app/providers/StoreProvider";

export const LanguageDecorator =
  (store: DeepPartial<StateSchema>) => (StoryComponent: Story) => {
    return (
      <StoreProvider initialState={store}>
        <StoryComponent />
      </StoreProvider>
    );
  };
