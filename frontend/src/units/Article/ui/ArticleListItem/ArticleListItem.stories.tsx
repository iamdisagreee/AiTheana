import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ArticleListItem } from "./ArticleListItem";

export default {
  title: "shared/ArticleListItem",
  component: ArticleListItem,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof ArticleListItem>;

const Template: ComponentStory<typeof ArticleListItem> = (args) => (
  <ArticleListItem {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [];
