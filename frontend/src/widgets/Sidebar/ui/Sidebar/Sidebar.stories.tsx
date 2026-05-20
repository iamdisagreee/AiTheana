// import React from "react";
// import { ComponentStory, ComponentMeta } from "@storybook/react";
// import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
// import { Theme } from "app/providers/ThemeProvider";
// import Sidebar from "./Sidebar";
// import { RouterDecorator } from "shared/config/storybook/RouterDecorator/RouterDecorator";
// import { User } from "units/User";
// import { StoreDecorator } from "shared/config/storybook/StoreDecorator/StoreDecorator";

// export default {
//   title: "widgets/Sidebar",
//   component: Sidebar,
//   argTypes: {
//     backgroundColor: { control: "color" },
//   },
// } as ComponentMeta<typeof Sidebar>;

// const Template: ComponentStory<typeof Sidebar> = (args) => (
//   <Sidebar {...args} />
// );

// const state: User = {
//   id: "1",
//   username: "1",
// };

// export const Primary = Template.bind({});
// Primary.args = {};
// Primary.decorators = [StoreDecorator({ user: { authData: state } })];

// export const Dark = Template.bind({});
// Dark.args = {};
// Dark.decorators = [
//   ThemeDecorator(Theme.DARK),
//   StoreDecorator({ user: { authData: state } }),
// ];
