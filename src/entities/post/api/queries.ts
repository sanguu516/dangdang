import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { getPosts } from "./get-posts";
import { getDetailPost } from "./get-detail-post";
import { PostDetailQuery } from "../model/types";

export const postQueries = {
  all: () => ["posts"],

  lists: () => [...postQueries.all(), "list"],
  list: (page: number, limit: number) =>
    queryOptions({
      queryKey: [...postQueries.lists(), page, limit],
      queryFn: () => getPosts(page, limit),
      placeholderData: keepPreviousData,
    }),

  details: () => [...postQueries.all(), "detail"],
  detail: (query?: PostDetailQuery) =>
    queryOptions({
      queryKey: [...postQueries.details(), query?.id],
      queryFn: () =>
        query?.id
          ? getDetailPost({ id: query.id })
          : Promise.reject("No ID provided"),
      enabled: !!query?.id,
      staleTime: 5000,
    }),
};
