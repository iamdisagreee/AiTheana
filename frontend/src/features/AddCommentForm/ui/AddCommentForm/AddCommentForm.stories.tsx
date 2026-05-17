import { ComponentStory, ComponentMeta } from "@storybook/react";
import AddCommentForm from "./AddCommentForm";
import { StoreDecorator } from "shared/config/storybook/StoreDecorator/StoreDecorator";
import { AddCommentForArticleSchema } from "../../model/types/AddCommentForArticleSchema";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";

export default {
  title: "features/AddCommentForm",
  component: AddCommentForm,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof AddCommentForm>;

const Template: ComponentStory<typeof AddCommentForm> = (args) => (
  <AddCommentForm {...args} />
);

const state: AddCommentForArticleSchema = {
  text: "Test input",
};

export const Primary = Template.bind({});
Primary.args = { onSendComment: () => {} };
Primary.decorators = [StoreDecorator({ addCommentForArticle: state })];

export const Dark = Template.bind({});
Dark.args = { onSendComment: () => {} };
Dark.decorators = [
  StoreDecorator({ addCommentForArticle: state }),
  ThemeDecorator(Theme.DARK),
];
