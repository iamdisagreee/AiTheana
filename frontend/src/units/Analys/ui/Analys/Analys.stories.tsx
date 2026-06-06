import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Analys } from "./Analys";

export default {
  title: "shared/Analys",
  component: Analys,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof Analys>;

const Template: ComponentStory<typeof Analys> = (args) => <Analys {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [];
