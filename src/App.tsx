import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import {BlogPostsApp} from "./blog-posts-app";

let queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <header className="h-20">
        <strong>
          Infinite Scroll with Tanstack Query and Intersection Observer
        </strong>
      </header>
      <BlogPostsApp />
      <footer className="h-20 "></footer>
    </QueryClientProvider>
  );
}

export default App;
