import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ArticleBlockImageComponent } from "./ArticleBlockImageComponent";
import { ArticleBlockImage, ArticleBlockType } from "../../model/types/article";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";
import Image from "shared/assets/test/image.jpg";

export default {
  title: "units/ArticleBlockImageComponent",
  component: ArticleBlockImageComponent,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof ArticleBlockImageComponent>;

const Template: ComponentStory<typeof ArticleBlockImageComponent> = (args) => (
  <ArticleBlockImageComponent {...args} />
);

const textProps: ArticleBlockImage = {
  id: "8",
  type: ArticleBlockType.IMAGE,
  src: Image,
  title: "Рисунок 1 - скриншот сайта",
};
export const Primary = Template.bind({});
Primary.args = { block: textProps };

export const Dark = Template.bind({});
Dark.args = { block: textProps };
Dark.decorators = [ThemeDecorator(Theme.DARK)];
