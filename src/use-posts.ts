import {useQuery} from "@tanstack/react-query";

import {fetchPosts} from "./api";

export const usePosts = (start = 0, end = 10) => {
  let {data, isError, isPending, refetch, isRefetching} = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      let {posts, totalPosts} = await fetchPosts(start, end);
      return {posts, totalPosts};
    },
  });

  return {data, isError, isPending, refetch, isRefetching};
};
