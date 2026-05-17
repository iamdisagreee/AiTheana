import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ArticleBlockCodeComponent } from "./ArticleBlockCodeComponent";
import { ArticleBlockCode, ArticleBlockType } from "../../model/types/article";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";

export default {
  title: "units/ArticleBlockCodeComponent",
  component: ArticleBlockCodeComponent,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof ArticleBlockCodeComponent>;

const Template: ComponentStory<typeof ArticleBlockCodeComponent> = (args) => (
  <ArticleBlockCodeComponent {...args} />
);

const textProps: ArticleBlockCode = {
  id: "4",
  type: ArticleBlockType.CODE,
  code: '<!DOCTYPE html>\n<html>\n  <body>\n    <p id="hello"></p>\n\n    <script>\n      document.getElementById("hello").innerHTML = "Hello, world!";\n    </script>\n  </body>\n</html>;<!DOCTYPE html>\n<html>\n  <body>\n    <p id="hello"></p>\n\n    <script>\n      document.getElementById("hello").innerHTML = "Hello, world!";\n    </script>\n  </body>\n</html>;<!DOCTYPE html>\n<html>\n  <body>\n    <p id="hello"></p>\n\n    <script>\n      document.getElementById("hello").innerHTML = "Hello, world!";\n    </script>\n  </body>\n</html>;',
};
export const Primary = Template.bind({});
Primary.args = { block: textProps };

export const Dark = Template.bind({});
Dark.args = { block: textProps };
Dark.decorators = [ThemeDecorator(Theme.DARK)];
