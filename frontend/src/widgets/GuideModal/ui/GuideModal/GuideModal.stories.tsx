import { ComponentStory, ComponentMeta } from "@storybook/react";
import GuideModal from "./GuideModal";

export default {
  title: "shared/GuideModal",
  component: GuideModal,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof GuideModal>;

const Template: ComponentStory<typeof GuideModal> = (args) => (
  <GuideModal {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [];
