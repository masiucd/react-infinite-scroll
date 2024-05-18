import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import {useInView} from "react-intersection-observer";
import {z} from "zod";

let queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <header className="h-20">
        <strong>
          Infinite Scroll with Tanstack Query and Intersection Observer
        </strong>
      </header>
      <Main />
      <footer className="h-20 ">
        <small></small>
      </footer>
    </QueryClientProvider>
  );
}

let postSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

const OFFSET = 10;

function Main() {
  let [end, setEnd] = useState(OFFSET);
  let {ref, inView} = useInView({
    threshold: 1,
  });
  let {data, isError, isPending, refetch, isLoading, isFetching} = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      let {posts, totalPosts} = await fetchPosts(0, end);
      return {posts, totalPosts};
    },
  });

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
    <main className="flex min-h-[calc(100dvh-10rem)] flex-col border bg-blue-400">
      <h1 className="mt-10 text-center text-4xl font-bold">
        React infinite scroll
      </h1>
      <div className="mb-4 flex-1 border border-red-500 bg-green-400 p-4">
        {isPending ? (
          <p>Loading...</p>
        ) : (
          <Posts posts={data?.posts.success ? data?.posts.data : []} />
        )}
      </div>
      {(isLoading || isPending || isFetching) && <p>Loading...</p>}
      <div ref={ref} className="h-20 p-10">
        <p>In view {inView.toString()}</p>
      </div>
    </main>
  );
}

function Posts({posts}: {posts: z.infer<typeof postSchema>[] | never[]}) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id} className="border-b-2 border-gray-200 px-4 py-8">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  );
}

async function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";
async function fetchPosts(start = 0, end = 10) {
  let response = await fetch(`${BASE_URL}?_start=${start}&_end=${end}`);
  let posts = await response.json();
  let totalPosts = response.headers.get("X-Total-Count");
  await sleep(4000);
  return {
    posts: postSchema.array().safeParse(posts),
    totalPosts,
  };
}

export default App;
