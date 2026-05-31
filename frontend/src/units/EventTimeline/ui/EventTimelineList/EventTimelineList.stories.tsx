import { ComponentStory, ComponentMeta } from "@storybook/react";
import { EventTimelineList } from "./EventTimelineList";

export default {
  title: "shared/EventTimelineList",
  component: EventTimelineList,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof EventTimelineList>;

const Template: ComponentStory<typeof EventTimelineList> = (args) => (
  <EventTimelineList {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [];
