import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk";
import { fetchNextArticlePage } from "./fetchNextArticlePage";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";

jest.mock("../fetchArticlesList/fetchArticlesList");

describe("fetchNextArticlePage", () => {
  test("200", async () => {
    const testAsyncThunk = new TestAsyncThunk(fetchNextArticlePage, {
      articlesPage: {
        ids: [],
        entities: {},
        limit: 10,
        hasMore: true,
        isLoading: false,
        page: 4,
      },
    });

    await testAsyncThunk.callThunk();

    expect(testAsyncThunk.dispatch).toBeCalledTimes(4);
    expect(fetchArticlesList).toHaveBeenCalledWith(5);
  });

  test("fetchArticlesList not called", async () => {
    const testAsyncThunk = new TestAsyncThunk(fetchNextArticlePage, {
      articlesPage: {
        ids: [],
        entities: {},
        limit: 10,
        hasMore: false,
        isLoading: true,
        page: 4,
      },
    });

    await testAsyncThunk.callThunk();

    expect(testAsyncThunk.dispatch).toBeCalledTimes(2);
    expect(fetchArticlesList).not.toHaveBeenCalled();
  });
});
