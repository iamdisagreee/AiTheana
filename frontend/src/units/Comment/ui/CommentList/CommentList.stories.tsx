import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CommentList } from "./CommentList";
import { Comment } from "../../model/types/comment";
import TestImage from "shared/assets/test/image.jpg";
import { RouterDecorator } from "shared/config/storybook/RouterDecorator/RouterDecorator";

export default {
  title: "units/CommentList",
  component: CommentList,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => (
  <CommentList {...args} />
);

const comments: Comment[] = [
  {
    articleId: "1",
    id: "1",
    text: "тестовый тест",
    user: { id: "1", username: "test username", avatar: TestImage },
  },
  {
    articleId: "1",
    id: "2",
    text: "тестовый тест",
    user: { id: "1", username: "test username", avatar: TestImage },
  },
  {
    articleId: "1",
    id: "3",
    text: "тестовый тест",
    user: { id: "1", username: "test username", avatar: TestImage },
  },
];

export const Primary = Template.bind({});
Primary.args = { isLoading: false, comments };
Primary.decorators = [RouterDecorator];

export const Loading = Template.bind({});
Loading.args = { isLoading: true, comments: [] };
Loading.decorators = [RouterDecorator];
