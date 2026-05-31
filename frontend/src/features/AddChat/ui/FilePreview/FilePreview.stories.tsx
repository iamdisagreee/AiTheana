import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FilePreview } from "./FilePreview";

export default {
  title: "shared/FilePreview",
  component: FilePreview,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof FilePreview>;

const Template: ComponentStory<typeof FilePreview> = (args) => (
  <FilePreview {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [];
