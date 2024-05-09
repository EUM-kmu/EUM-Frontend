import { useInfiniteQuery } from "@tanstack/react-query";

import PostApi from "@/api/post-api";

export const useGetPostList = () => {
  return useInfiniteQuery({
    queryKey: ["post-list"],
    queryFn: ({ pageParam }) =>
      PostApi.getPostList({ page: pageParam, size: 10 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length : undefined;
    },
  });
};
