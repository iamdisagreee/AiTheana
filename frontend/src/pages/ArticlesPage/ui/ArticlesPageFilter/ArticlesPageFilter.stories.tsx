import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ArticlesPageFilter } from "./ArticlesPageFilter";

export default {
  title: "shared/ArticlesPageFilter",
  component: ArticlesPageFilter,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof ArticlesPageFilter>;

const Template: ComponentStory<typeof ArticlesPageFilter> = (args) => (
  <ArticlesPageFilter {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [];
