export enum SortBy {
  ID = "id",
  TITLE = "title",
  CREATED_AT = "created_at",
}

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export interface ChatQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
  interlocutorId?: number;
  replace?: boolean;
  hasMore?: boolean;
}
