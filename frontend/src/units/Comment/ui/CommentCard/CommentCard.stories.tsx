// import { ComponentStory, ComponentMeta } from "@storybook/react";
// import { CommentCard } from "./CommentCard";
// import TestImage from "shared/assets/test/image.jpg";
// import { Comment } from "../../model/types/comment";
// import { RouterDecorator } from "shared/config/storybook/RouterDecorator/RouterDecorator";

// export default {
//   title: "units/CommentCard",
//   component: CommentCard,
//   argTypes: {
//     backgroundColor: { control: "color" },
//   },
//   args: {
//     to: "/",
//   },
// } as ComponentMeta<typeof CommentCard>;

// const Template: ComponentStory<typeof CommentCard> = (args) => (
//   <CommentCard {...args} />
// );

// const comment: Comment = {
//   articleId: "1",
//   id: "1",
//   text: "тестовый тест",
//   user: { id: "1", username: "test username", avatar: TestImage },
// };

// export const Primary = Template.bind({});
// Primary.args = {
//   comment,
// };

// Primary.decorators = [RouterDecorator];
