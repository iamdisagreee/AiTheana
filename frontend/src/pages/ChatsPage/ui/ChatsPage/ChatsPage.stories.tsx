import { ComponentStory, ComponentMeta } from "@storybook/react";
import ChatsPage from "./ChatsPage";

export default {
  title: "shared/ChatsPage",
  component: ChatsPage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof ChatsPage>;

const Template: ComponentStory<typeof ChatsPage> = (args) => (
  <ChatsPage {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [];

// const chats: Chat[] = [
//   {
//     id: 1,
//     interlocutor_id: 123,
//     status: ChatStatus.EMPTY,
//     title: "Chat Владимир",
//     original_period_start: "2026-05-26T06:15:30Z",
//     original_period_end: "2026-05-26T06:15:30Z",
//     created_at: "2026-05-26T06:15:30Z",
//     updated_at: "2026-05-26T06:15:30Z",
//   },
//   {
//     id: 2,
//     interlocutor_id: 123,
//     status: ChatStatus.EMPTY,
//     title: "Chat Петр",
//     original_period_start: "2026-05-26T06:15:30Z",
//     original_period_end: "2026-05-26T06:15:30Z",
//     created_at: "2026-05-26T06:15:30Z",
//     updated_at: "2026-05-26T06:15:30Z",
//   },
//   {
//     id: 3,
//     interlocutor_id: 123,
//     status: ChatStatus.EMPTY,
//     title: "Chat Петр",
//     original_period_start: "2026-05-26T06:15:30Z",
//     original_period_end: "2026-05-26T06:15:30Z",
//     created_at: "2026-05-26T06:15:30Z",
//     updated_at: "2026-05-26T06:15:30Z",
//   },
//   {
//     id: 4,
//     interlocutor_id: 123,
//     status: ChatStatus.EMPTY,
//     title: "Chat Петр",
//     original_period_start: "2026-05-26T06:15:30Z",
//     original_period_end: "2026-05-26T06:15:30Z",
//     created_at: "2026-05-26T06:15:30Z",
//     updated_at: "2026-05-26T06:15:30Z",
//   },
//   {
//     id: 5,
//     interlocutor_id: 123,
//     status: ChatStatus.EMPTY,
//     title: "Chat Петр",
//     original_period_start: "2026-05-26T06:15:30Z",
//     original_period_end: "2026-05-26T06:15:30Z",
//     created_at: "2026-05-26T06:15:30Z",
//     updated_at: "2026-05-26T06:15:30Z",
//   },
//   {
//     id: 6,
//     interlocutor_id: 123,
//     status: ChatStatus.EMPTY,
//     title: "Chat Петр",
//     original_period_start: "2026-05-26T06:15:30Z",
//     original_period_end: "2026-05-26T06:15:30Z",
//     created_at: "2026-05-26T06:15:30Z",
//     updated_at: "2026-05-26T06:15:30Z",
//   },
// ];
