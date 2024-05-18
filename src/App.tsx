import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import {useState} from "react";
import {z} from "zod";

let queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  );
}

let postSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

function Main() {
  let [start, setStart] = useState(0);
  let [end, setEnd] = useState(10);
  let [posts, setPosts] = useState<z.infer<typeof postSchema>[] | never[]>([]);
  console.log({start, end});
  let {data, isError, isPending} = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      let {posts, totalPosts} = await fetchPosts(start, end);
      return {posts, totalPosts};
    },
  });
  if (isError) {
    return <p>Error fetching posts</p>;
  }

  return (
    <div>
      <h1 className="mt-10 text-center text-4xl font-bold">
        React infinite scroll
      </h1>
      {isPending ? (
        <p>Loading...</p>
      ) : (
        <Posts posts={data?.posts.success ? data?.posts.data : []} />
      )}
      <div>
        {data?.totalPosts && (
          <button
            onClick={() => {
              // setStart(start + 10);
              setEnd(end + 10);
            }}
            className="rounded-md bg-blue-500 p-2 text-white"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}

function Posts({posts}: {posts: z.infer<typeof postSchema>[] | never[]}) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id} className="border-b-2 border-gray-200 p-4">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  );
}

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";
async function fetchPosts(start = 0, end = 10) {
  console.log({start, end});
  let response = await fetch(`${BASE_URL}?_start=${start}&_end=${end}`);
  let posts = await response.json();
  let totalPosts = response.headers.get("X-Total-Count");
  return {
    posts: postSchema.array().safeParse(posts),
    totalPosts,
  };
}

export default App;
