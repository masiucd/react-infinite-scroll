import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
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
  let {data, isError, isPending} = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
  if (isError) {
    return <p>Error fetching posts</p>;
  }
  return (
    <div>
      <h1 className="mt-10 text-center text-4xl font-bold">
        React infinite scroll
      </h1>
      <ul>
        {isPending ? (
          <p>Loading...</p>
        ) : (
          data?.map((post) => (
            <li key={post.id} className="border-b-2 border-gray-200 p-4">
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p>{post.body}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";
async function fetchPosts() {
  let response = await fetch(`${BASE_URL}?_start=0&_end=10`);
  let posts = await response.json();
  return postSchema.array().parse(posts);
}

export default App;
