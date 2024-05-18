import {useEffect, useState} from "react";
import {useInView} from "react-intersection-observer";

import {cn} from "./lib/cn";
import {Posts} from "./posts";
import {usePosts} from "./use-posts";

export function BlogPostsApp() {
  let [end, setEnd] = useState(OFFSET);
  let {ref, inView} = useInView({
    threshold: 0.5,
  });
  let {data, isError, isPending, refetch, isRefetching} = usePosts(0, end);

  useEffect(() => {
    if (inView) {
      setEnd((prev) => prev + OFFSET);
    }
  }, [inView]);

  useEffect(() => {
    refetch();
  }, [refetch, end]);

  if (isError) {
    return <p>Error fetching posts</p>;
  }

  return (
    <main className="relative mx-auto flex min-h-[calc(100dvh-10rem)] max-w-3xl flex-col">
      <h1 className="mt-10 text-center text-4xl font-bold">
        React infinite scroll
      </h1>
      {data && (
        <span
          className={cn(
            "fixed right-0 top-0 p-2 text-sm text-gray-500",
            isRefetching && "animate-pulse",
          )}
        >
          {isRefetching ? end - OFFSET : end} / {data?.totalPosts}
        </span>
      )}

      <div className="mb-4 flex-1 p-4">
        {isPending ? (
          <LoadingSkeleton />
        ) : (
          <Posts
            isRefetching={isRefetching}
            posts={data?.posts.success ? data?.posts.data : []}
          />
        )}
      </div>
      <div ref={ref} className="h-20 p-10">
        <LoadingMessage isRefetching={isRefetching} />
      </div>
    </main>
  );
}

function LoadingSkeleton() {
  return (
    <ul className="flex h-full animate-pulse flex-col gap-4">
      {Array.from({length: OFFSET}).map((_, i) => {
        return (
          <li
            key={i}
            className="flex flex-col gap-3 border-b-2 border-gray-300 px-4 py-8"
          >
            <div className="h-4 w-3/4 rounded-md bg-gray-300 shadow-lg" />
            <div className="h-4 w-1/2 rounded-md bg-gray-300 shadow-lg" />
            <div className="h-4 w-7/12 rounded-md bg-gray-300 shadow-lg" />
            <div className="h-4 w-1/4 rounded-md bg-gray-300 shadow-lg" />
          </li>
        );
      })}
    </ul>
  );
}

function LoadingMessage({isRefetching}: {isRefetching: boolean}) {
  if (isRefetching) {
    return (
      <div className="animate-pulse">
        <strong>Fetching more posts...</strong>
      </div>
    );
  }
  return null;
}

const OFFSET = 10;
