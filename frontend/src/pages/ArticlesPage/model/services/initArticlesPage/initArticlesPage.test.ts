import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk";
import { initArticlesPage } from "./initArticlesPage";

jest.mock("../fetchArticlesList/fetchArticlesList");

describe("initArticlesPage", () => {
  test("200", async () => {
    const testAsyncThunk = new TestAsyncThunk(initArticlesPage, {
      articlesPage: {
        ids: [],
        entities: {},
        limit: 10,
        hasMore: true,
        isLoading: false,
        page: 4,
        _inited: false,
      },
    });

    await testAsyncThunk.callThunk();

    expect(testAsyncThunk.dispatch).toBeCalledTimes(2);
  });

  test("initArticlesPage not called", async () => {
    const testAsyncThunk = new TestAsyncThunk(initArticlesPage, {
      articlesPage: {
        ids: [],
        entities: {},
        limit: 10,
        hasMore: false,
        isLoading: true,
        page: 4,
        _inited: true,
      },
    });

    await testAsyncThunk.callThunk();

    expect(testAsyncThunk.dispatch).toBeCalledTimes(2);
  });
});
