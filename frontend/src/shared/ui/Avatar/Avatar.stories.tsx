import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { StyleDecorator } from "shared/config/storybook/StyleDecorator/StyleDecorator";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";
import { RouterDecorator } from "shared/config/storybook/RouterDecorator/RouterDecorator";
import Avatar from "./Avatar";
import AvatarImg from "shared/assets/test/image.jpg";

export default {
  title: "shared/Avatar",
  component: Avatar,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  src: AvatarImg,
  size: 50,
};
Primary.decorators = [RouterDecorator];

export const Big = Template.bind({});
Big.args = {
  src: AvatarImg,
};
Big.decorators = [RouterDecorator];
