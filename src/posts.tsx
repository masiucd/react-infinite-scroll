import {cn} from "./lib/cn";
import {type Post as PostType} from "./schema";

export function Posts({
  posts,
  isRefetching,
}: {
  posts: PostType[] | never[];
  isRefetching: boolean;
}) {
  return (
    <ul
      className={cn("flex h-full flex-col gap-4", isRefetching && "opacity-50")}
    >
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </ul>
  );
}

function titleCase(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

function Post({post}: {post: PostType}) {
  return (
    <li className="border-b-2 border-gray-200 px-4 py-8">
      <strong className="text-2xl font-bold tracking-tighter">
        {titleCase(post.title)}
      </strong>
      <p className="mt-2 text-gray-600 md:pr-60">{post.body}</p>
    </li>
  );
}
