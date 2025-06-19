import { config } from "@/config";
import {
  buildWispClient,
  GetPostsResult,
  GetPostResult,
} from "@wisp-cms/client";

export const wisp = buildWispClient({
  blogId: config.wisp.blogId,
});

export type { GetPostsResult, GetPostResult };

export async function getPhotographyProjects() {
  const res = await wisp.getContent("photographyProject");
  return res;
}