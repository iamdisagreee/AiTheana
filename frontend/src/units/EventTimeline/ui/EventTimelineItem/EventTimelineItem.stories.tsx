import { ComponentStory, ComponentMeta } from "@storybook/react";
import { EventTimelineItem } from "./EventTimelineItem";

export default {
  title: "shared/EventTimelineItem",
  component: EventTimelineItem,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof EventTimelineItem>;

const Template: ComponentStory<typeof EventTimelineItem> = (args) => (
  <EventTimelineItem {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [];
