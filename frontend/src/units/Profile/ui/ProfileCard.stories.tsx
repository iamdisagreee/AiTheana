import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { StyleDecorator } from "shared/config/storybook/StyleDecorator/StyleDecorator";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";
import { RouterDecorator } from "shared/config/storybook/RouterDecorator/RouterDecorator";
import ProfileCard from "./ProfileCard";
import { Profile } from "../model/types/ProfileSchema";
import { StoreDecorator } from "shared/config/storybook/StoreDecorator/StoreDecorator";
import AvatarImg from "shared/assets/test/image.jpg";

const data: Profile = {
  avatar: AvatarImg,
  first: "Vova",
  lastname: "Kharitonov",
  age: 22,
  city: "Yaroslavl",
  username: "iamdisagree",
};

export default {
  title: "units/ProfileCard",
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => (
  <ProfileCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  formData: data,
};
Primary.decorators = [StoreDecorator({ profile: { formData: data } })];
