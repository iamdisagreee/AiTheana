import { ComponentStory, ComponentMeta } from "@storybook/react";
import { InfoPanel } from "./InfoPanel";

export default {
  title: "shared/InfoPanel",
  component: InfoPanel,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof InfoPanel>;

const Template: ComponentStory<typeof InfoPanel> = (args) => (
  <InfoPanel {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [];
