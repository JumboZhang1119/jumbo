// app/blog/[slug]/page.tsx
import { wisp } from "@/lib/wisp";
import { notFound } from "next/navigation";
import GlobalNavbar from "@/components/GlobalNavbar";
import { Footer } from "@/components/Footer";

// 靜態生成所有可能的 blog slug 頁面
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const result = await wisp.getPosts({ limit: 100 }); // 可調整數量
  return result.posts.map((post) => ({ slug: post.slug }));
}

// 單篇 blog 頁面
export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const result = await wisp.getPost(params.slug);

  if (!result?.post) return notFound();

  const { title, content, publishedAt, createdAt, tags = [] } = result.post;

  return (
    <>
      <GlobalNavbar />
      <main className="prose lg:prose-xl dark:prose-invert mx-auto pt-28 pb-20 px-4">
        <h1>{title}</h1>

        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Tag 與發布日期 */}
        <div className="mt-8 text-sm text-gray-500">
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.length > 0 &&
              tags.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                >
                  #{tag.name}
                </span>
              ))}
          </div>
          <div>{new Date(publishedAt || createdAt).toLocaleDateString()}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
