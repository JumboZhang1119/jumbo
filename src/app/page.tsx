import GlobalNavbar from "@/components/GlobalNavbar";
import { Footer } from "@/components/Footer";
import { getPhotographyProjects } from "@/lib/wisp";
import { wisp } from "@/lib/wisp";
import PostsFilterClient from "@/components/PostsFilterClient";

export default async function Page() {
  const projectData = await getPhotographyProjects();
  const projects = projectData?.contents ?? [];
  const result = await wisp.getPosts({ limit: 50 });

  // 把 tags 也準備好（讓 client component 用）
  const postsWithTags = result.posts.map((post) => ({
    ...post,
    tags: post.tags ?? [],
    image: post.image ?? undefined,
    description: post.description ?? undefined,
  }));

  return (
    <>
      <GlobalNavbar />
      <div className="container mx-auto px-5 pt-[120px] pb-16">
        <h1
          className="text-5xl sm:text-6xl font-medium mb-6 text-center tracking-wide"
          style={{ fontFamily: "OneDay, sans-serif" }}
        >
          Blog
        </h1>

        {/* 將 posts 傳給 client component，交給它做篩選顯示 */}
        <PostsFilterClient posts={postsWithTags} />

        <Footer />
      </div>
    </>
  );
}


