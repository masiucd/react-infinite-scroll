import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

let queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  );
}

export default App;

function Main() {
  let {data, isError, isPending} = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
  return (
    <div>
      <h1 className="mt-10 text-center text-4xl font-bold">
        React infinite scroll
      </h1>
      <ul>{isPending && <p>Loading...</p>}</ul>
    </div>
  );
}

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";
async function fetchPosts() {
  let response = await fetch(`${BASE_URL}`);
  let posts = await response.json();

  return posts;
}
