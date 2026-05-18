import { EntityState } from "@reduxjs/toolkit";
import { Comment } from "units/Comment";

export interface ArticleDetailsCommentsSchema extends EntityState<Comment> {
  isLoading?: boolean;
  error?: string;
}
