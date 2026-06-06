import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Image } from "./Image";

export default {
  title: "shared/Image",
  component: Image,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof Image>;

const Template: ComponentStory<typeof Image> = (args) => <Image {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [];
