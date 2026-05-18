import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ArticleTypeTabs } from "./ArticleTypeTabs";

export default {
  title: "shared/ArticleTypeTabs",
  component: ArticleTypeTabs,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof ArticleTypeTabs>;

const Template: ComponentStory<typeof ArticleTypeTabs> = (args) => (
  <ArticleTypeTabs {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [];
