import { ArticleDetailsCommentsSchema } from "./articleDetailsCommentsSchema";
import { ArticleDetailsRecommendationsSchema } from "./articleDetailsPageRecommendations";

export interface ArticleDeailsPageSchema {
  recommends: ArticleDetailsRecommendationsSchema;
  comments: ArticleDetailsCommentsSchema;
}
