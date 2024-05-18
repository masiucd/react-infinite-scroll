import {postSchema} from "./schema";

async function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";
export async function fetchPosts(start = 0, end = 10) {
  try {
    let response = await fetch(`${BASE_URL}?_start=${start}&_end=${end}`);
    let posts = await response.json();
    let totalPosts = response.headers.get("X-Total-Count");
    await sleep(4000);
    return {
      posts: postSchema.array().safeParse(posts),
      totalPosts,
    };
  } catch (error) {
    return {
      posts: {
        success: false,
        data: [],
      },
      totalPosts: 0,
    };
  }
}
