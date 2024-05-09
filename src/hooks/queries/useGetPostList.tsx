import { useInfiniteQuery } from "@tanstack/react-query";

import PostApi from "@/api/post-api";

export const useGetPostList = (search: string) => {
  if (search !== "") {
    return useInfiniteQuery({
      queryKey: ["post-list-search", search],
      queryFn: ({ pageParam }) =>
        PostApi.getPostList({ page: pageParam, size: 10, search: search }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined;
      },
    });
  } else {
    return useInfiniteQuery({
      queryKey: ["post-list"],
      queryFn: ({ pageParam }) =>
        PostApi.getPostList({ page: pageParam, size: 10 }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined;
      },
    });
  }
};
