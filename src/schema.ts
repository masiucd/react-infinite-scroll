import {z} from "zod";

export let postSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

export type Post = z.infer<typeof postSchema>;
