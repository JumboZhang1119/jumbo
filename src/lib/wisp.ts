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

// export async function getPhotographyProjects() {
//   const res = await wisp.getContent({
//     contentTypeSlug: "photographyProject",
//     contentSlug: "tpac"
//   });
//   console.log("Wisp photographyProject data:", res);
//   return res;
// }

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
