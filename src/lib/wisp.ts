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
  try {
    const res = await wisp.getContents({
      contentTypeSlug: "photographyProject",
      limit: "all",
    });
    return res;
  } catch (error) {
    console.error("Error fetching photography projects:", error);
    return null;
  }
}

export async function getBlogPosts() {
  const res = await wisp.getContents({
    contentTypeSlug: 'blogPost',
    limit: 100,
  });
  res.contents.sort((a, b) => {
    const dateA = new Date(a.publishedAt ?? a.createdAt ?? 0).getTime();
    const dateB = new Date(b.publishedAt ?? b.createdAt ?? 0).getTime();
    return dateB - dateA;
  });

  return res;
}
